"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function LandingPage() {
  const imageRef = useRef(null);

  // GSAP animation for floating effect
  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section (Content) */}
      <div className="flex-1 flex items-center justify-center bg-gray-900 p-16">
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
            className="text-5xl font-extrabold text-green-500 mb-6 leading-snug"
          >
            Welcome to <span className="text-white">HostelMate Management Website 🚀</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            Experience a modern platform with a clean design, smooth animations, and effortless navigation 🎨⚡. Whether it’s a broken chair 🪑, water leakage 💧, or electricity issues 💡—reporting problems is now just a few clicks away!

Scroll, interact, and explore 🌍 as we transform the way hostel complaints are handled—fast ⚡, transparent 🔍, and reliable 🤝.

Because your comfort matters ❤️, and every student deserves a hassle-free stay 📚✨.
          </motion.p>
        </motion.div>
      </div>

      {/* Right Section (Animated Image) */}
      <div className="flex-1 flex items-center justify-center bg-gray-800 p-8 relative">
        <motion.img
          ref={imageRef}
          src=     "/hostel1.jpg"
          alt="Landing Visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="rounded-2xl shadow-2xl border-4 border-green-500 object-cover w-auto h-full"
        />
      </div>
    </main>
  );
}
