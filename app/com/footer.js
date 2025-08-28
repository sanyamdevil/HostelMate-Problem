"use client";
import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white py-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand / Name */}
        <h2 className="text-2xl font-bold text-blue-300">Sanyam Mehta</h2>
        
        {/* Quick Links */}
        <div className="flex flex-wrap gap-6 text-md font-medium">
          <Link href="/" className="text-blue-300 hover:underline transition">
            Home
          </Link>
          <Link href="/section" className="text-blue-300 hover:underline transition">
            Section
          </Link>
          <Link href="/about" className="text-blue-300 hover:underline transition">
            About
          </Link>
          <Link href="/problem" className="text-blue-300 hover:underline transition">
            Problem
          </Link>
         
        </div>
        
        <div className="flex justify-center md:justify-start gap-6 mt-6 md:mt-0">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-blue-500 transition transform hover:scale-110"
          >
            <FaInstagram className="text-xl" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-blue-500 transition transform hover:scale-110"
          >
            <FaFacebookF className="text-xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-blue-500 transition transform hover:scale-110"
          >
            <FaTwitter className="text-xl" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-blue-500 transition transform hover:scale-110"
          >
            <FaLinkedinIn className="text-xl" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} Sanyam Mehta. All Rights Reserved.
      </div>
    </footer>
  );
}
