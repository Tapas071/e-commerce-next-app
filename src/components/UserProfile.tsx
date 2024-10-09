import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type UserProfileProps = {
  user: {
    isAdmin: boolean;
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-card text-card-foreground">
      <CardHeader>
        <h2 className="text-2xl font-bold text-primary">User Profile</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-muted-foreground">Username:</span>
          <span className="text-accent-foreground">{user.username}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-muted-foreground">Email:</span>
          <span className="text-accent-foreground">{user.email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-muted-foreground">Admin:</span>
          <span
            className={`px-2 py-1 rounded-full ${
              user.isAdmin
                ? "bg-destructive text-destructive-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {user.isAdmin ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-muted-foreground">
            Created At:
          </span>
          <span className="text-accent-foreground">
            {new Date(user.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-muted-foreground">
            Updated At:
          </span>
          <span className="text-accent-foreground">
            {new Date(user.updatedAt).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
