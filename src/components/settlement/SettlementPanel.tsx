import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, CreditCard, Wallet } from "lucide-react";

interface SettlementOption {
  id: string;
  fromUser: string;
  toUser: string;
  amount: number;
}

interface SettlementPanelProps {
  options?: SettlementOption[];
  onSettlePayment?: (optionId: string) => void;
  isOpen?: boolean;
}

const defaultOptions: SettlementOption[] = [
  {
    id: "1",
    fromUser: "Alice Smith",
    toUser: "Bob Johnson",
    amount: 50.0,
  },
  {
    id: "2",
    fromUser: "Charlie Brown",
    toUser: "Alice Smith",
    amount: 25.5,
  },
  {
    id: "3",
    fromUser: "David Wilson",
    toUser: "Eve Anderson",
    amount: 75.25,
  },
];

const SettlementPanel = ({
  options = defaultOptions,
  onSettlePayment = () => {},
  isOpen = true,
}: SettlementPanelProps) => {
  return (
    <Card className="w-[400px] h-[600px] bg-white p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Settlement Options</h2>
        <Wallet className="h-6 w-6 text-gray-500" />
      </div>

      <p className="text-gray-600 mb-4">
        Suggested payments to settle balances efficiently
      </p>

      <Separator className="mb-4" />

      <ScrollArea className="flex-grow">
        <div className="space-y-4">
          {options.map((option) => (
            <Card
              key={option.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{option.fromUser}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{option.toUser}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  ${option.amount.toFixed(2)}
                </span>
                <Button
                  onClick={() => onSettlePayment(option.id)}
                  className="flex items-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Settle</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Separator className="my-4" />

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Total Settlements</p>
          <p className="text-lg font-bold">
            $
            {options.reduce((sum, option) => sum + option.amount, 0).toFixed(2)}
          </p>
        </div>
        <Button variant="outline" className="w-32">
          View History
        </Button>
      </div>
    </Card>
  );
};

export default SettlementPanel;
