import { supabase } from "./supabase";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  if (error) throw error;

  // Create user profile in the users table
  if (data.user) {
    const { error: profileError } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.id}`,
      },
    });
    if (profileError) throw profileError;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
