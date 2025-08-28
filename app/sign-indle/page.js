// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useSignIn, useAuth } from "@clerk/nextjs";

// export default function LoginPage() {
//   const { signIn, isLoaded: isSignInLoaded } = useSignIn();
//   const { isSignedIn } = useAuth();

//   const [formData, setFormData] = useState({ email: "", password: "" });

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // Handle email/password login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isSignInLoaded) return;

//     try {
//       const result = await signIn.create({
//         identifier: formData.email,
//         password: formData.password,
//       });

//       if (result.status === "complete") {
//         // ✅ Login successful → redirect
//         window.location.href = "/home";
//       } else {
//         console.log("Additional steps required:", result);
//       }
//     } catch (err) {
//       console.error("Login error:", err.errors);
//       alert("❌ " + (err.errors?.[0]?.message || "Login failed"));
//     }
//   };

//   // Handle Google OAuth
//   const handleGoogleSignin = async () => {
//     if (!isSignInLoaded) return;

//     if (isSignedIn) {
//       window.location.href = "/home";
//       return;
//     }

//     try {
//       await signIn.authenticateWithRedirect({
//         strategy: "oauth_google",
//         redirectUrl: "/sso-callback",
//         redirectUrlComplete: "/home",
//       });
//     } catch (err) {
//       console.error("Google login error:", err.errors);
//       alert("⚠️ " + (err.errors?.[0]?.message || "Google login failed"));
//     }
//   };

//   return (
//     <main className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Section */}
//       <div className="flex-1 flex items-center justify-center bg-gray-900 p-10">
//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="max-w-md text-center md:text-left"
//         >
//           <motion.h1
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="text-4xl font-bold text-green-600 mb-4"
//           >
//             Welcome Back 🚀
//           </motion.h1>
//           <motion.p
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="text-lg text-white leading-relaxed"
//           >
//             Please sign in with your email or Google account to continue.
//           </motion.p>
//         </motion.div>
//       </div>

//       {/* Right Section (Form) */}
//       <div className="flex-1 flex items-center justify-center bg-gray-900 p-8">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9, y: 30 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
//         >
//           {/* Title */}
//           <motion.h1
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-3xl font-bold text-center mb-8 text-white"
//           >
//             Sign In
//           </motion.h1>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium mb-2 text-gray-300"
//               >
//                 Email
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium mb-2 text-gray-300"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white placeholder-gray-400"
//               />
//             </div>

//             {/* Email/Password Login Button */}
//             <motion.button
//               type="submit"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="w-full py-2 px-4 rounded-lg bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition-all duration-300"
//             >
//               Login
//             </motion.button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <div className="flex-grow border-t border-gray-600"></div>
//             <span className="mx-3 text-gray-400">or</span>
//             <div className="flex-grow border-t border-gray-600"></div>
//           </div>

//           {/* Google Button */}
//           <motion.button
//             onClick={handleGoogleSignin}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             className="w-full py-2 px-4 rounded-lg bg-white text-green-600 font-semibold shadow-lg hover:bg-gray-200 transition-all duration-300"
//           >
//             Continue with Google
//           </motion.button>

//           {/* Footer */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="text-center mt-6 text-gray-400"
//           >
//             Don&apos;t have an account?{" "}
//             <a
//               href="/signup"
//               className="text-green-400 font-semibold hover:underline"
//             >
//               Sign up
//             </a>
//           </motion.p>
//         </motion.div>
//       </div>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  // State to track email + password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // send email + password
      });

      const data = await res.json();
      console.log("Response from FastAPI:", data);

      if (res.ok) {
        alert("✅ Login successful: " + data.message);
      } else {
        alert("❌ Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center bg-gray-900 p-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-md text-center md:text-left"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-green-600 mb-4"
          >
            Welcome to OnlyFans 🚀
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-white leading-relaxed"
          >
            This site is for maintaining purpose.  
            Please login to the OnlyFans website and enjoy it.  
            Stay connected and explore more!
          </motion.p>
        </motion.div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex-1 flex items-center justify-center bg-gray-900 p-8" >
        <motion.div
  initial={{ opacity: 0, scale: 0.9, y: 30 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
        >

          {/* Title */}
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-8 text-white"
          >
            Login
          </motion.h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-full py-2 px-4 rounded-lg bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition-all duration-300"
            >
              Login
            </motion.button>
          </form>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-6 text-gray-400"
          >
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-green-400 font-semibold hover:underline"
            >
              Sign up
            </a>
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
