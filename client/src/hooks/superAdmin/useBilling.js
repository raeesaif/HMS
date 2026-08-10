import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTransactions, requestRefund } from '@/services/superAdmin/billingService';

const KEY = ['superAdmin', 'transactions'];

export function useTransactions() {
  return useQuery({ queryKey: KEY, queryFn: fetchTransactions });
}

export function useRequestRefund() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ transactionId, payload }) => requestRefund(transactionId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}
