import { create } from 'zustand';
import client from '../services/client';
import { useAuthStore } from './authStore';

interface BalanceState {
    balance: number;
    fetchBalance: () => Promise<void>;
    updateBalance: (amount: number) => void;
}

export const useBalanceStore = create<BalanceState>((set) => ({
    balance: 0,
    fetchBalance: async () => {
        try {
            const userId = useAuthStore.getState().user?.id;
            if (!userId) return;
            const response = await client.get<{ balance: number }>(
                `users/${userId}`
            );
            console.log("Балик " + response.data.balance)
            set({ balance: response.data.balance });
        } catch (error) {
            console.error('Ошибка при получении баланса:', error);
        }
    },
    updateBalance: (amount: number) => {
        set((state) => ({ balance: state.balance + amount }));
    },
}));
