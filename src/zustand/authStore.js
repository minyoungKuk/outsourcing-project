import { create } from 'zustand';

import supabase from './../config/supabase';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      const { data: userData } = await supabase.auth.getUser();
      set({ isAuthenticated: true, user: userData.user });
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
}));

export default useAuthStore;
