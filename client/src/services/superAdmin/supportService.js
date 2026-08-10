import { tickets } from '@/data/superAdmin/support';
import { simulateRequest } from '@/services/apiClient';

export function fetchTickets() {
  return simulateRequest(tickets);
}

export function createTicket(payload) {
  return simulateRequest({ id: `TCK-${Date.now()}`, status: 'Open', assignedTo: 'Unassigned', messages: [], attachments: [], ...payload });
}

export function replyToTicket(ticketId, message) {
  return simulateRequest({ ticketId, message: { id: `m-${Date.now()}`, author: 'Super Admin', ...message } });
}

export function assignTicket(ticketId, assignedTo) {
  return simulateRequest({ id: ticketId, assignedTo });
}

export function updateTicketStatus(ticketId, status) {
  return simulateRequest({ id: ticketId, status });
}

export function updateTicketPriority(ticketId, priority) {
  return simulateRequest({ id: ticketId, priority });
}
