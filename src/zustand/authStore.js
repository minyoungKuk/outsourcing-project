import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import supabase from './../config/supabase';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error) {
          const { data: userData } = await supabase
            .from('user')
            .select('*')
            .eq('id', data.user.id)
            .single();

          set({ isAuthenticated: true, user: userData });
        } else {
          console.error('Login error:', error);
        }
      },
      logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
          set({ isAuthenticated: false, user: null });
        } else {
          console.error('Logout error:', error);
        }
      },
    }),

    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
      getStorage: () => localStorage, // 기본 저장소는 localStorage
    },
  ),
);

export default useAuthStore;
