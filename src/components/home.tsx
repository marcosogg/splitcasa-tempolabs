import React, { useState } from "react";
import { createExpense } from "@/lib/expenses";
import { useAuth } from "@/contexts/AuthContext";
import { useInitializeProfile } from "@/lib/hooks";
import DashboardHeader from "./dashboard/DashboardHeader";
import BalanceSummary from "./dashboard/BalanceSummary";
import FriendBalanceGrid from "./dashboard/FriendBalanceGrid";
import ExpenseModal from "./expenses/ExpenseModal";
import TransactionList from "./transactions/TransactionList";
import SettlementPanel from "./settlement/SettlementPanel";

interface HomeProps {
  userName?: string;
  userAvatar?: string;
}

const Home = () => {
  const { user } = useAuth();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Initialize user profile
  useInitializeProfile();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={user.user_metadata.full_name || "User"}
        userAvatar={user.user_metadata.avatar_url}
        onAddExpense={() => setIsExpenseModalOpen(true)}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <BalanceSummary />
            <FriendBalanceGrid />
            <TransactionList />
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-6">
              <SettlementPanel />
            </div>
          </div>
        </div>
      </div>

      <ExpenseModal
        open={isExpenseModalOpen}
        onOpenChange={setIsExpenseModalOpen}
        onSubmit={async (data) => {
          try {
            await createExpense({
              description: data.description,
              amount: data.amount,
              splitType: data.splitType,
              participants: data.participants,
              customAmounts: data.customAmounts,
            });
            setIsExpenseModalOpen(false);
          } catch (error) {
            console.error("Error creating expense:", error);
          }
        }}
      />
    </div>
  );
};

export default Home;
