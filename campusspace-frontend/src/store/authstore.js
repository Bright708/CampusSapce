import { create } from "zustand";

import { supabase } from "../lib/supabase";

const useAuthStore = create((set) => ({
  user: null,

  session: null,

  loading: false,

  role: null,

  // REGISTER
  signUp: async ({ email, password, full_name, role }) => {
    set({ loading: true });

    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Insert profile
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          email,
          full_name,
          role,
        },
      ]);

      if (profileError) throw profileError;

      set({
        user: data.user,
        session: data.session,
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    } finally {
      set({ loading: false });
    }
  },

  // LOGIN
  signIn: async ({ email, password }) => {
    set({ loading: true });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch role
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      set({
        user: data.user,
        session: data.session,
        role: profile.role,
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    } finally {
      set({ loading: false });
    }
  },

  // LOGOUT
  signOut: async () => {
    await supabase.auth.signOut();

    set({
      user: null,
      session: null,
      role: null,
    });
  },

  // CHECK SESSION
  checkAuth: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const user = session.user;

    // Fetch role
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    set({
      user,
      session,
      role: profile.role,
    });
  },
}));

export default useAuthStore;
