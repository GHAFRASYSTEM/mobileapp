import { useState }  from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { api }       from '@/services/api';

export function usePayDues() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * @param type    'dues' | 'donation'
   * @param amount  Euro amount (e.g. 20). Required for donations; ignored for dues.
   */
  const pay = async (type: 'dues' | 'donation', amount?: number) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // 1. Create PaymentIntent on backend
      const intent = await api.post<{
        client_secret:     string;
        payment_intent_id: string;
        amount:            number;
        currency:          string;
        label:             string;
        type:              string;
      }>('/dues/create-payment-intent', { type, amount });

      // 2. Init Stripe Payment Sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName:       'GHAFRA',
        paymentIntentClientSecret: intent.client_secret,
        appearance: {
          colors: {
            primary:    '#006B3F',
            background: '#ffffff',
          },
        },
      });

      if (initError) throw new Error(initError.message);

      // 3. Present Stripe sheet
      const { error: payError } = await presentPaymentSheet();

      if (payError) {
        if (payError.code === 'Canceled') return; // user dismissed
        throw new Error(payError.message);
      }

      // 4. Confirm with backend
      await api.post('/dues/confirm', {
        payment_intent_id: intent.payment_intent_id,
        type,
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