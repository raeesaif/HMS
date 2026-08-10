import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchTickets,
  createTicket,
  replyToTicket,
  assignTicket,
  updateTicketStatus,
  updateTicketPriority,
} from '@/services/superAdmin/supportService';

const KEY = ['superAdmin', 'tickets'];

export function useTickets() {
  return useQuery({ queryKey: KEY, queryFn: fetchTickets });
}

function useInvalidatingMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn, onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }) });
}

export function useCreateTicket() {
  return useInvalidatingMutation(createTicket);
}

export function useReplyToTicket() {
  return useInvalidatingMutation(({ ticketId, message }) => replyToTicket(ticketId, message));
}

export function useAssignTicket() {
  return useInvalidatingMutation(({ ticketId, assignedTo }) => assignTicket(ticketId, assignedTo));
}

export function useUpdateTicketStatus() {
  return useInvalidatingMutation(({ ticketId, status }) => updateTicketStatus(ticketId, status));
}

export function useUpdateTicketPriority() {
  return useInvalidatingMutation(({ ticketId, priority }) => updateTicketPriority(ticketId, priority));
}
