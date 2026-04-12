import { useState, useEffect } from 'react';
import { api }                 from '@/services/api';

export type TxType   = 'dues' | 'donation';
export type TxStatus = 'completed' | 'pending' | 'failed';

export type Transaction = {
  id:       string;
  type:     TxType;
  label:    string;
  amount:   number;
  currency: string;
  date:     string;
  status:   TxStatus;
  month:    number;
  year:     number;
};

type ApiPayment = {
  id:         string;
  type:       TxType;
  label:      string | null;
  month:      number;
  year:       number;
  amount:     number;
  currency:   string;
  status:     TxStatus;
  created_at: string;
};

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

function buildLabel(tx: ApiPayment): string {
  if (tx.label) return tx.label;
  const month = MONTH_NAMES[tx.month - 1] ?? '';
  return tx.type === 'dues'
    ? `${month} Dues ${tx.year}`
    : `Donation — ${month} ${tx.year}`;
}

export function useTransactions(type?: TxType) {
  const [data,    setData]    = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      try {
        setLoading(true);
        setError(null);

        const params = type ? `?type=${type}` : '';
        const res = await api.get<ApiPayment[]>(`/transactions${params}`);

        const mapped: Transaction[] = res.map(tx => ({
          id:       tx.id,
          type:     tx.type,
          label:    buildLabel(tx),
          amount:   Number(tx.amount),
          currency: tx.currency,
          date:     tx.created_at,
          status:   tx.status,
          month:    tx.month,
          year:     tx.year,
        }));

        if (!cancelled) setData(mapped);
      } catch (err: any) {
        console.error('[Transactions] error:', err.message);
        if (!cancelled) setError('Failed to load transactions.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [type]);

  return { data, loading, error };
}