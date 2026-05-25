import { create } from "zustand";

import { supabase } from "../lib/supabase";

const useAuthStore = create((set) => ({
  user: null,

  session: null,

  role: null,

  loading: false,

  profile: null,

  // REGISTER

  signUp: async ({ email, password, full_name, role }) => {
    set({
      loading: true,
    });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,

        options: {
          data: {
            full_name,
            role,
          },
        },
      });

      if (error) {
        throw error;
      }

      set({
        user: data.user,
        session: data.session,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: error.message,
      };
    } finally {
      set({
        loading: false,
      });
    }
  },

  // LOGIN

  signIn: async ({ email, password }) => {
    set({
      loading: true,
    });

    try {
      // LOGIN USER
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // FETCH PROFILE
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();

      console.log(profile);
      console.log(profileError);

      if (profileError) {
        console.log(profileError);
        console.log("PROFILE FETCH ERROR:", profileError);

        throw profileError;
      }

      // STORE USER
      set({
        user: data.user,
        session: data.session,
        role: profile ? profile.role : null,
        profile,
      });

      return {
        success: true,
        role: profile ? profile.role : null,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: error.message,
      };
    } finally {
      set({
        loading: false,
      });
    }
  },

  // LOGOUT

  signOut: async () => {
    await supabase.auth.signOut();

    set({
      user: null,
      session: null,
      role: null,
      profile: null,
    });
  },

  // CHECK AUTH

  checkAuth: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // NO SESSION
    if (!session) {
      set({
        user: null,
        session: null,
        role: null,
        profile: null,
      });

      return;
    }

    const user = session.user;

    // GET PROFILE
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    set({
      user,
      session,
      role: profile ? profile.role : "student",
      profile,
    });
  },
}));

export default useAuthStore;
