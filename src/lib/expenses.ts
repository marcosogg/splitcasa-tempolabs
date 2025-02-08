import { supabase } from "./supabase";

export async function createExpense({
  description,
  amount,
  splitType,
  participants,
  customAmounts,
}: {
  description: string;
  amount: number;
  splitType: "equal" | "custom";
  participants: string[];
  customAmounts?: Record<string, number>;
}) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data: expense, error: expenseError } = await supabase
    .from("expenses")
    .insert({
      description,
      amount,
      split_type: splitType,
      created_by: user.id,
    })
    .select()
    .single();

  if (expenseError) throw expenseError;

  const participantAmounts =
    splitType === "equal"
      ? participants.map((userId) => ({
          expense_id: expense.id,
          user_id: userId,
          amount: amount / participants.length,
        }))
      : participants.map((userId) => ({
          expense_id: expense.id,
          user_id: userId,
          amount: customAmounts?.[userId] || 0,
        }));

  const { error: participantsError } = await supabase
    .from("expense_participants")
    .insert(participantAmounts);

  if (participantsError) throw participantsError;

  return expense;
}
