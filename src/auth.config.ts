import { NextAuthOptions } from "next-auth";

const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [],
};

export default authConfig;
