import { useState, useEffect } from 'react';
import { api } from '@/services/api';

export type TxType = 'dues' | 'donation';
export type TxStatus = 'completed' | 'pending' | 'failed';

export type Transaction = {
  id: string;
  type: TxType;
  label: string;
  amount: number;
  currency: string;
  date: string;
  status: TxStatus;
};

type ApiDuesPayment = {
  id: string;
  month: number;
  year: number;
  amount: number;
  currency: string;
  status: TxStatus;
  created_at: string;
};

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export function useTransactions() {
  const [data,    setData]    = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchTransactions() {
      try {
        setLoading(true);
        setError(null);

        // ✅ Fetch from your API
        const res = await api.get<ApiDuesPayment[]>('/transactions/dues');

        // ✅ Transform to UI format
        const mapped: Transaction[] = res.map((tx) => ({
          id: tx.id,
          type: 'dues',
          label: `${MONTH_NAMES[tx.month - 1]} Dues ${tx.year}`,
          amount: Number(tx.amount),
          currency: tx.currency,
          date: tx.created_at,
          status: tx.status,
        }));

        if (!cancelled) setData(mapped);

      } catch (err: any) {
        console.error('[Transactions] error:', err.message);
        if (!cancelled) setError('Failed to load transactions.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTransactions();

    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}