
// import  NextAuthOptions  from "next-auth";

import { Session } from "inspector/promises";
import { NextAuthConfig } from "next-auth";
// import Providers from "next-auth/providers";

// const authConfig: NextAuthOptions = {
//   pages: {
//     signIn: "/auth/signin",
//   },
//   session: {
//     strategy: "jwt", // Use JWT for session management
//     maxAge: 30 * 24 * 60 * 60, // Session will last for 30 days
//     updateAge: 24 * 60 * 60, // Session will be updated every 24 hours
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
//   cookies: {
//     sessionToken: {
//       name: `next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         path: "/",
//         maxAge: 30 * 24 * 60 * 60, // Cookie expires after 30 days
//       },
//     },
//   },
//   providers: [],
// };

// export default authConfig;

//  test ---- 2 ------------

// import GitHub from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextAuthConfig } from "next-auth";

// export default { providers: [CredentialsProvider] } satisfies NextAuthConfig;

// test 3 ------------------------

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [],
} satisfies NextAuthConfig;
