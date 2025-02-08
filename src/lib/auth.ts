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
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      },
    },
  });

  if (authError) {
    throw authError;
  }

  // *AFTER* successful signup, get the user's UUID.
  if (data?.user?.id) {
    const { error: profileError } = await supabase.from("users").insert({
      id: data.user.id,
      email: email,
      full_name: fullName,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    });

    if (profileError) {
      console.error("Error creating user profile:", profileError);
      throw profileError;
    }
  } else {
    throw new Error("User creation failed: no user ID returned.");
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
