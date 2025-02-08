import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface BalanceSummaryProps {
  totalOwed?: number;
  totalOwing?: number;
}

const BalanceSummary = ({
  totalOwed = 150.5,
  totalOwing = 75.25,
}: BalanceSummaryProps) => {
  return (
    <div className="w-full bg-background p-6">
      <h2 className="text-2xl font-bold mb-4">Balance Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Owed to You</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${totalOwed.toFixed(2)}
              </p>
            </div>
            <ArrowUpCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total You Owe</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                ${totalOwing.toFixed(2)}
              </p>
            </div>
            <ArrowDownCircle className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="md:col-span-2 p-6 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Net Balance</p>
              <p
                className={`text-3xl font-bold ${totalOwed - totalOwing >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                ${(totalOwed - totalOwing).toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {totalOwed - totalOwing >= 0
                ? "You're owed overall"
                : "You owe overall"}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BalanceSummary;
