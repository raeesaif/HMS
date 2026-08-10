import { getUsers, getUserById } from '@/data/superAdmin/users';
import { simulateRequest } from '@/services/apiClient';

export function fetchUsers() {
  return simulateRequest(getUsers());
}

export function fetchUserById(userId) {
  return simulateRequest(getUserById(userId));
}

export function updateUser(userId, payload) {
  return simulateRequest({ id: userId, ...payload });
}

export function suspendUser(userId) {
  return simulateRequest({ id: userId, status: 'Suspended' });
}

export function activateUser(userId) {
  return simulateRequest({ id: userId, status: 'Active' });
}

export function resetUserPassword(userId) {
  return simulateRequest({ id: userId, resetLinkSent: true });
}
