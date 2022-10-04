import { client } from '../utils/fetchClient';
import { PasswordModule } from '../types/PasswordModule';

export const getPasswords = (userId: number) => {
  return client.get<PasswordModule[]>(`/passwordItems?userId=${userId}`);
};

export const createPassword = (data: {}) => {
  return client.post('/passwordItems', data);
};

export const deletePassword = (passwordItemId: number) => {
  return client.delete(`/passwordItems/${passwordItemId}`);
};

export const updatePassword = (passwordItemId: number, data: {}) => {
  return client.patch(`/passwordItems/${passwordItemId}`, data);
};
