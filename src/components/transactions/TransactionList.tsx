import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Filter, ChevronDown } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  participants: string[];
  status: "pending" | "completed";
}

interface TransactionListProps {
  transactions?: Transaction[];
  onFilterChange?: (filters: any) => void;
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date(),
    description: "Dinner at Restaurant",
    amount: 120.5,
    participants: ["John", "Alice", "Bob"],
    status: "completed",
  },
  {
    id: "2",
    date: new Date(),
    description: "Movie Tickets",
    amount: 45.0,
    participants: ["John", "Alice"],
    status: "pending",
  },
  {
    id: "3",
    date: new Date(),
    description: "Groceries",
    amount: 89.99,
    participants: ["Bob", "Charlie"],
    status: "completed",
  },
];

const TransactionList = ({
  transactions = defaultTransactions,
  onFilterChange = () => {},
}: TransactionListProps) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="w-full h-[400px] bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Transaction History</h2>
        <div className="flex gap-4">
          <Input placeholder="Search transactions..." className="w-[200px]" />

          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={"w-[200px] justify-start text-left font-normal"}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[300px]">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{transaction.description}</h3>
                <p className="text-sm text-gray-500">
                  {format(transaction.date, "PPP")}
                </p>
                <div className="flex gap-2 mt-1">
                  {transaction.participants.map((participant, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  ${transaction.amount.toFixed(2)}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
