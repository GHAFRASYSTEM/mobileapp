import { useState }        from 'react';
import { useStripe }       from '@stripe/stripe-react-native';
import { api }             from '@/services/api';

type DuesStatus = {
  paid:     boolean;
  label:    string;
  amount:   number;
  currency: string;
  month:    number;
  year:     number;
};

export function usePayDues() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [success,  setSuccess]  = useState(false);

  const pay = async (method: 'card' | 'momo') => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // 1. Ask backend to create a PaymentIntent
      const intent = await api.post<{
        client_secret:     string;
        payment_intent_id: string;
        amount:            number;
        currency:          string;
        label:             string;
      }>('/dues/create-payment-intent', { method });

      // 2. Init Stripe Payment Sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName:        'GHAFRA',
        paymentIntentClientSecret:  intent.client_secret,
        defaultBillingDetails: {
          // Pre-fill from profile if you want
        },
        appearance: {
          colors: {
            primary:    '#006B3F',
            background: '#ffffff',
          },
        },
      });

      if (initError) throw new Error(initError.message);

      // 3. Present the Stripe payment sheet to the user
      const { error: payError } = await presentPaymentSheet();

      if (payError) {
        if (payError.code === 'Canceled') return; // user dismissed — not an error
        throw new Error(payError.message);
      }

      // 4. Payment succeeded on Stripe — confirm with our backend
      await api.post('/dues/confirm', {
        payment_intent_id: intent.payment_intent_id,
        method,
      });

      setSuccess(true);

    } catch (e: any) {
      setError(e.message ?? 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { pay, loading, error, success };
}