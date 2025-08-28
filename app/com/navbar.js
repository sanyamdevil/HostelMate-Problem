
"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Section", path: "/section" },
    { name: "About", path: "/about" },
    { name: "Problem", path: "/problem" },
  ];

  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 text-2xl font-extrabold tracking-wide 
              bg-gradient-to-r from-green-400 via-green-600 to-white 
              bg-clip-text text-transparent 
              drop-shadow-[0_0_8px_rgba(34,197,94,0.7)]"
          >
            Sam
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.path}
                    className="relative text-white font-medium transition duration-300 ease-in-out hover:text-green-400"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Auth Buttons */}
            <SignedOut>
              <SignInButton mode="redirect">
                <button className="px-4 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-800 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <button className="px-4 py-2 rounded-lg font-semibold bg-white text-green-600 border border-green-600 hover:bg-green-800 hover:text-white transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 ring-2 ring-green-600 rounded-full transition hover:ring-green-800",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none text-3xl"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/20"
          >
            <ul className="flex flex-col items-center space-y-6 py-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="relative text-green-400 font-medium transition duration-300 ease-in-out hover:text-white"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}

              {/* Mobile Auth Buttons */}
              <SignedOut>
                <SignInButton mode="redirect">
                  <button className="px-4 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-800 transition">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <button className="px-4 py-2 rounded-lg font-semibold bg-white text-green-600 border border-green-600 hover:bg-green-800 hover:text-white transition">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-12 h-12 ring-2 ring-green-600 rounded-full transition hover:ring-green-800",
                    },
                  }}
                />
              </SignedIn>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

