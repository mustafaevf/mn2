import axios from 'axios';
import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { setSession } from '../services/jwt';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuth: false,
      isRegister: false,

      login: async (login, password) => {
        try {
          const response = await axios.post('http://localhost:8080/api/auth/login', { login, password });
          const token = response.data.token;
          // setSession(token);
          set({ user: response.data.candidate, isAuth: true, token: token});
        } catch (error) {
          throw error;
        }
      },

      register: async (login, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', { login, password });
            console.log(response);
            set({isRegister: true});
        } catch (error) {
            throw error;
        }
      },

      check: async () => {
        try {
          const token = get().token;
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          const response = await axios.get('http://localhost:8080/api/auth/auth');
        } catch (error) {
          console.log(error);
          set({user: null, token: null, isAuth: false, isRegister: false});
          // throw error;   
        }
      },

      logout: async () => {
        try {
          set({user: null, token: null, isAuth: false, isRegister: false});
        } catch (error) {
          console.log(error);
        }
      }

    }),
    {
      name: 'auth-storage', 
      getStorage: () => localStorage, 
    }
  )
);
