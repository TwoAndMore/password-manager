import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUserByData = async (login: string, password: string) => {
  const users = await client.get<User[]>(`/users?login=${login}&password=${password}`);

  return users[0] || null;
};

type UserData = Pick<User, 'login' | 'password'>;

export const createUser = async ({ login, password }: UserData) => {
  return client.post<User>('/users', { login, password });
};

export const isLoginAvailable = async (login: string) => {
  const users = await client.get<User[]>(`/users?login=${login}`);

  if (users.length > 0) {
    return false;
  }

  return true;
};
