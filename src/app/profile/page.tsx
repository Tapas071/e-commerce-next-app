import { auth } from "@/auth";
import UserProfile from "@/components/UserProfile";
import { userInformation } from "@/lib/actions/auth.action";
import { SessionData } from "@/types";
import React from "react";



const Page = async () => {
  const session: SessionData | null = await auth();

  if (!session) {
    return <div>No session available</div>;
  }
  if (session.user) {
    const email = session.user.email;
        if(!email) return <div>Email not available</div>;
      const userData = await userInformation({ email });
      return (
        <div>
          <UserProfile user={userData.user} />      
        </div>
      );
  }
  return <div>Page</div>;
};

export default Page;
