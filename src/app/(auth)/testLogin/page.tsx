// import { signIn } from "@/auth";

//  function SignIn() {
//   return (
//     <form
//       action={async (formData) => {
//         "use server";
//         await signIn("credentials", formData);
//       }}
//     >
//       <label>
//         Email
//         <input name="email" type="email" />
//       </label>
//       <label>
//         Password
//         <input name="password" type="password" />
//       </label>
//       <button>Sign In</button>
//     </form>
//   );
// }
// export default SignIn;

//  test 2 ---------------------------------------

// // "use client"
// // import React from "react";
// // import { signIn } from "next-auth/react";
// // // import { signIn } from "@/auth";

// // const TestLogin = () => {
// //   return (
// //     <form
// //       onSubmit={async (e) => {
// //         e.preventDefault();
// //         const formData = new FormData(e.target as HTMLFormElement);
// //         const email = formData.get("email");
// //         const password = formData.get("password");
// //         await signIn("credentials", { email, password });
// //       }}
// //     >
// //       <label>
// //         Email:
// //         <input type="email" name="email" required />
// //       </label>
// //       <label>
// //         Password:
// //         <input type="password" name="password" required />
// //       </label>
// //       <button type="submit">Sign In</button>
// //     </form>
// //   );
// // };

// // export default TestLogin;

// // ----- test 3-----------------


// "use client";
// import { signIn } from "next-auth/react";

//  function LoginP() {
//   const credentialsAction = (formData: FormData) => {
//     const formDataObj: { [key: string]: string } = {};
//     formData.forEach((value, key) => {
//       formDataObj[key] = value.toString();
//     });
//     console.log("formDataObj", formDataObj);
//     signIn("credentials", formDataObj);
//   };

//   return (
//     <form action={credentialsAction}>
//       <label htmlFor="credentials-email">
//         Emaill
//         <input type="email" id="credentials-email" name="email" />
//       </label>
//       <label htmlFor="credentials-password">
//         Password
//         <input type="password" id="credentials-password" name="password" />
//       </label>
//       <input type="submit" value="Sign In" />
//     </form>
//   );
// }
// export default LoginP;

// test 4 ----------------------------

// // pages/auth/signin.tsx
// "use client";
// import { signIn } from 'next-auth/react';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//     });

//     if (res?.ok) {
//       router.push('/');
//     } else {
//       alert('Authentication failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Sign In</button>
//     </form>
//   );
// };

// export default SignIn;

// test 5 ----------------------------


import { signIn } from "@/auth";
import { redirect } from "next/navigation";

 function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
       const result: { ok?: boolean; error?: string } = await signIn("credentials", formData);
         if (result.ok) {
           // Redirect to home page ("/") if successful
           redirect("/");
         } else {
           // Handle sign-in failure (e.g., show error message)
           console.error("Sign-in failed:", result?.error);
         }

      }}
    >
      <label>
        Email
        <input className="text-black" name="email" type="email" />
      </label>
      <label>
        Password
        <input className="text-black" name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
export default SignIn;


