// // src/lib/auth.ts
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = { id: "1", name: "John Doe", email: "john@example.com" };

//         if (user) {
//           return user;
//         }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
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
// };

//  test 1

// import NextAuth from 'next-auth';
// import { authOptions } from '@/lib/auth'; // Assuming you have your auth options defined in `lib/auth`

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST } = auth;
// export {auth};

// export { handlers as GET, handlers as POST } from "@/lib/auth";
// test 2 ---------------------------

// import { handlers, auth } from "@/lib/auth"; // Import the handlers and auth instance

// export { handlers as GET, handlers as POST }; // Export the handlers
// export { auth };
import { handlers } from "@/auth";
export const { GET, POST } = handlers;