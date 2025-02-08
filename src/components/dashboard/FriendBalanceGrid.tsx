import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FriendBalance {
  id: string;
  name: string;
  avatarUrl: string;
  balance: number;
  lastTransaction: string;
}

interface FriendBalanceGridProps {
  friends: FriendBalance[];
}

const defaultFriends: FriendBalance[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    balance: 50.0,
    lastTransaction: "2 days ago",
  },
  {
    id: "2",
    name: "Mike Johnson",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    balance: -25.5,
    lastTransaction: "1 day ago",
  },
  {
    id: "3",
    name: "Emily Davis",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    balance: 75.25,
    lastTransaction: "3 hours ago",
  },
  {
    id: "4",
    name: "Alex Thompson",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    balance: -15.75,
    lastTransaction: "Just now",
  },
];

const FriendBalanceGrid = ({
  friends = defaultFriends,
}: FriendBalanceGridProps) => {
  return (
    <div className="w-full h-[300px] bg-background p-6">
      <h2 className="text-2xl font-semibold mb-4">Friend Balances</h2>
      <ScrollArea className="h-[220px] w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <Card key={friend.id} className="p-4 flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <img
                    src={friend.avatarUrl}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full"
                  />
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {friend.lastTransaction}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge
                  variant={friend.balance >= 0 ? "default" : "destructive"}
                  className="text-sm"
                >
                  {friend.balance >= 0 ? "You owe" : "Owes you"}
                </Badge>
                <span
                  className={`font-semibold ${friend.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  ${Math.abs(friend.balance).toFixed(2)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendBalanceGrid;
