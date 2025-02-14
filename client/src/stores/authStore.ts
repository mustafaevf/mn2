import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import client from '../services/client';
import { IUser } from '../types/User';
import { useBalanceStore } from './balanceStore';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuth: boolean;
  isRegister: boolean;
  login: (login: string, password: string) => Promise<void>;
  register: (login: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuth: false,
      isRegister: false,

      login: async (login: string, password: string) => {
        try {
          const response = await client.post<{ token: string; candidate: IUser }>('/auth/login', { login, password });
          console.log(response.data);
          const { token, candidate } = response.data;
          set({ user: candidate, isAuth: true, token: token });
          useBalanceStore.getState().fetchBalance();
        } catch (error) {
          throw error;
        }
      },

      register: async (login: string, password: string) => {
        try {
          await client.post('/auth/register', { login, password });
          set({ isRegister: true });
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuth: false, isRegister: false });
      },
    }),
    {
      name: 'auth-storage', 
      storage: {
        getItem: (name) => {
          const storedValue = localStorage.getItem(name);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
