// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// // Your own logic for dealing with plaintext password strings; be careful!
// // import { saltAndHashPassword } from "@/utils/password";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         let user = null;

//         // logic to salt and hash password
//         // const pwHash = saltAndHashPassword(credentials.password);
//         if (!credentials) {
//           throw new Error("Credentials are missing.");
//         }
//         const pw = credentials.password;

//         // logic to verify if the user exists
//         const newUser = {
//           email: credentials.email,
//           password: pw, // Store the hashed password
//           // Add any other user fields you need
//         };
//         return newUser;
//         // user = await getUserFromDb(credentials.email, pwHash);
//         // if (!user) {
//         //   // Create a new user if one doesn't exist

//         //   // Save the new user to the database
//         //   user = await saveUserToDb(newUser);
//         // }

//         if (!user) {
//           // No user found, so this is their first attempt to login
//           // meaning this is also the place you could do registration
//           throw new Error("User not found.");
//         }

//         // return user object with their profile data
//         return user;
//       },
//     }),
//   ],
// });

//  ---------------------------------
// test 2
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// // Your own logic for dealing with plaintext password strings; be careful!
// // import { saltAndHashPassword } from "@/utils/password";

// export const { handlers, signIn, signOut, auth, GET, POST } = NextAuth({
//   providers: [
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         let user = null;

//         // logic to salt and hash password
//         // const pwHash = saltAndHashPassword(credentials.password);

//         // logic to verify if the user exists
//         // user = await getUserFromDb(credentials.email, pwHash);

//         if (!credentials) {
//           throw new Error("Credentials are missing.");
//         }

//         const sampleUser = {
//           email: credentials.email,
//           password: credentials.password, // In a real application, you should hash the password
//           name: "Sample User",
//           role: "user",
//         };

//         if (!user) {
//           // No user found, so this is their first attempt to login
//           // meaning this is also the place you could do registration
//           throw new Error("User not found.");
//         }

//         // return user object with their profile data
//         return user;
//       },
//     }),
//   ],
// });
// -------------------------------------
// test 3


// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";
// import { signInSchema } from "./lib/zod";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
    
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "Email" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Password",
//         },
//       },
//       async authorize(credentials) {
//         let user = null;

//         // validate credentials
//         const parsedCredentials = signInSchema.safeParse(credentials);
//         if (!parsedCredentials.success) {
//           console.error("Invalid credentials:", parsedCredentials.error.errors);
//           return null;
//         }
//         // get user

//         user = {
//           id: "1",
//           name: "Aditya Singh",
//           email: "jojo@jojo.com",
//           role: "admin",
//         };

//         if (!user) {
//           console.log("Invalid credentials");
//           return null;
//         }

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     authorized({ request: { nextUrl }, auth }) {
//       const isLoggedIn = !!auth?.user;
//       const { pathname } = nextUrl;
//       const role = auth?.user.role || "user";
//       if (pathname.startsWith("/auth/signin") && isLoggedIn) {
//         return Response.redirect(new URL("/", nextUrl));
//       }
//       if (pathname.startsWith("/page2") && role !== "admin") {
//         return Response.redirect(new URL("/", nextUrl));
//       }
//       return !!auth;
//     },
//     jwt({ token, user, trigger, session }) {
//       if (user) {
//         token.id = user.id as string;
//         token.role = user.role as string;
//       }
//       if (trigger === "update" && session) {
//         token = { ...token, ...session };
//       }
//       return token;
//     },
//     session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
// });
// -----------------

// test 4
                ///                   this is working code
// src/lib/auth.ts
// import authConfig from "@/auth.config";
// import NextAuth , { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { loginUser } from "./actions/auth.action";

// interface IUserLoginCredentials {
//   email: string;
//   password: string;
// }

// export const authOptions: NextAuthOptions = {
//   ...authConfig,
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           throw new Error("Credentials are missing.");
//         }

//         const parsedCredentials: IUserLoginCredentials = {
//           email: credentials.email,
//           password: credentials.password,
//         };
//         const user2Res = await loginUser(credentials);
//         if(user2Res){
//           console.log(" this is userRes from server action" +user2Res);
//           console.log(" this is userRes from server action" +user2Res.statusCode);
//           console.log(" this is userRes from server action" +user2Res.user);
//           if(user2Res.statusCode === 401){
//             return null;
//           }
//           return user2Res.user;
//         }
//         // console.log(" this is userRes from server action" +user2Res);
        
//         // const user = { id: "1", name: "John Doe", email: "john@example.com" };

//         // if (user) {
//         //   return user;
//         // }
//         return null;
//       },
//     }),
//   ],

// };
// const auth = NextAuth(authOptions); // Capture the NextAuth instance

// export const { handlers } = auth; // Extract handlers (GET and POST)
// export { auth }; 


// test 5 --------- this try is done from tapas adhikary youtube channel -----------------------
                   
// import authConfig from "@/auth.config";
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { loginUser } from "./actions/auth.action";

// interface IUserLoginCredentials {
//   email: string;
//   password: string;
// }

// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
//     signOut,
// } = NextAuth( {
//   ...authConfig,
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           throw new Error("Credentials are missing.");
//         }

//         const parsedCredentials: IUserLoginCredentials = {
//           email: credentials.email,
//           password: credentials.password,
//         };
//         const user2Res = await loginUser(credentials);
//         if(user2Res){
//           console.log(" this is userRes from server action" +user2Res);
//           console.log(" this is userRes from server action" +user2Res.statusCode);
//           console.log(" this is userRes from server action" +user2Res.user);
//           if(user2Res.statusCode === 401){
//             return null;
//           }
//           return user2Res.user;
//         }
//         // console.log(" this is userRes from server action" +user2Res);
        
//         // const user = { id: "1", name: "John Doe", email: "john@example.com" };

//         // if (user) {
//         //   return user;
//         // }
//         return null;
//       },
//     }),
//   ],

// });

// ----------------------------------------
 // test 6

// import NextAuth from "next-auth";
// import authConfig from "@/auth.config";
import NextAuth  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./lib/actions/auth.action";
import { authConfig } from "./auth.config";



interface IUserLoginCredentials {
  email: string;
  password: string;
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are missing.");
        }

        const parsedCredentials: IUserLoginCredentials = {
          email: (credentials as IUserLoginCredentials).email,
          password: (credentials as IUserLoginCredentials).password,
        };
        const user2Res = await loginUser(parsedCredentials);
        if (user2Res) {
          //   console.log(" this is userRes from server action" +user2Res);
          //   console.log(" this is userRes from server action" +user2Res.statusCode);
          //   console.log(" this is userRes from server action" +user2Res.user);
          if (user2Res.statusCode === 401) {
            return null;
          }
          return user2Res.user;
        }
        // console.log(" this is userRes from server action" +user2Res);

        // const user = { id: "1", name: "John Doe", email: "john@example.com" };

        // if (user) {
        //   return user;
        // }
        return null;
      },
    }),
  ],
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
});




