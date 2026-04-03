import { useState, useEffect } from 'react';

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

const MOCK: Transaction[] = [
  { id: '1', type: 'dues',     label: 'April Dues 2026',    amount: 10, currency: 'EUR', date: '2026-04-01', status: 'completed' },
  { id: '2', type: 'donation', label: 'Community Fund',     amount: 25, currency: 'EUR', date: '2026-03-15', status: 'completed' },
  { id: '3', type: 'dues',     label: 'March Dues 2026',    amount: 10, currency: 'EUR', date: '2026-03-01', status: 'completed' },
  { id: '4', type: 'donation', label: 'School Project',     amount: 50, currency: 'EUR', date: '2026-02-20', status: 'completed' },
  { id: '5', type: 'dues',     label: 'February Dues 2026', amount: 10, currency: 'EUR', date: '2026-02-01', status: 'completed' },
  { id: '6', type: 'dues',     label: 'January Dues 2026',  amount: 10, currency: 'EUR', date: '2026-01-03', status: 'failed'    },
];

export function useTransactions() {
  const [data,    setData]    = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      try {
        setLoading(true);
        setError(null);
        // Swap this timeout for: const res = await api.get('/transactions');
        await new Promise(r => setTimeout(r, 900));
        if (!cancelled) setData(MOCK);
      } catch {
        if (!cancelled) setError('Failed to load transactions.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}