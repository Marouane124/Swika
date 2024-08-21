import axios from 'axios';
import { User, UserAttributes } from '@/types/types';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users`);
    const users: User[] = response.data;
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUserStatus = async (id: number, status: string) => {
  const response = await axios.put(`${BASE_URL}/api/users/${id}`, {
    blocked: status === 'Blocked',
    confirmed: status === 'Confirmed',
  });
  return response.data;
};

export const updateUser = async (id: number, data: Partial<UserAttributes>) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/users/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};