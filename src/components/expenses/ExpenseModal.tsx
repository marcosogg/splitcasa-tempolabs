import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, DollarSign, SplitSquareVertical } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  avatar: string;
}

interface ExpenseModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: ExpenseFormData) => void;
  participants?: Participant[];
}

const expenseFormSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  splitType: z.enum(["equal", "custom"]),
  participants: z.array(z.string()).min(1, "Select at least one participant"),
  customAmounts: z.record(z.number()).optional(),
});

type ExpenseFormData = z.infer<typeof expenseFormSchema>;

const defaultParticipants: Participant[] = [
  {
    id: "1",
    name: "Alice Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  {
    id: "2",
    name: "Bob Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
  {
    id: "3",
    name: "Carol Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
  },
];

const ExpenseModal = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
  participants = defaultParticipants,
}: ExpenseModalProps) => {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      amount: undefined,
      description: "",
      splitType: "equal",
      participants: [],
      customAmounts: {},
    },
  });

  const splitType = form.watch("splitType");
  const selectedParticipants = form.watch("participants");

  const handleSubmit = form.handleSubmit((data) => {
    if (data.splitType === "custom") {
      const totalCustomAmount = Object.values(data.customAmounts || {}).reduce(
        (sum, amount) => sum + amount,
        0,
      );
      if (Math.abs(totalCustomAmount - data.amount) > 0.01) {
        form.setError("amount", {
          type: "custom",
          message: "Custom amounts must sum to total amount",
        });
        return;
      }
    }
    onSubmit(data);
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Add New Expense
          </DialogTitle>
          <DialogDescription>
            Enter expense details and split it among participants.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                {...form.register("amount", { valueAsNumber: true })}
                type="number"
                placeholder="Enter amount"
                className="w-full"
                step="0.01"
                min="0"
              />
              {form.formState.errors.amount && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                {...form.register("description")}
                placeholder="What's this expense for?"
                className="w-full"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Split Type</Label>
              <RadioGroup
                defaultValue="equal"
                value={splitType}
                onValueChange={(value) =>
                  form.setValue("splitType", value as "equal" | "custom")
                }
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="equal" id="equal" />
                  <Label htmlFor="equal" className="flex items-center gap-2">
                    <SplitSquareVertical className="w-4 h-4" />
                    Split Equally
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Custom Split
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Select Participants</Label>
              <ScrollArea className="h-[200px] border rounded-md p-4">
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={participant.id}
                        checked={selectedParticipants.includes(participant.id)}
                        onCheckedChange={(checked) => {
                          const current = form.getValues("participants");
                          const updated = checked
                            ? [...current, participant.id]
                            : current.filter((id) => id !== participant.id);
                          form.setValue("participants", updated);
                        }}
                      />
                      <Avatar className="h-8 w-8">
                        <img src={participant.avatar} alt={participant.name} />
                      </Avatar>
                      <Label htmlFor={participant.id}>{participant.name}</Label>
                      {splitType === "custom" && (
                        <Input
                          type="number"
                          placeholder="Amount"
                          className="w-24"
                          step="0.01"
                          min="0"
                          {...form.register(`customAmounts.${participant.id}`, {
                            valueAsNumber: true,
                          })}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              {form.formState.errors.participants && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.participants.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
