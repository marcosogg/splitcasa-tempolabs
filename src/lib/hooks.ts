import { useEffect } from "react";
import { supabase } from "./supabase";
import { useAuth } from "@/contexts/AuthContext";

export function useInitializeProfile() {
  const { user } = useAuth();

  useEffect(() => {
    async function createProfile() {
      if (!user) return;

      const { data: existingProfile } = await supabase
        .from("users")
        .select()
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        await supabase.from("users").insert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
        });
      }
    }

    createProfile();
  }, [user]);
}
