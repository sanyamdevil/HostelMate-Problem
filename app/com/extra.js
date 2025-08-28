"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Fancy icons

gsap.registerPlugin(TextPlugin);

export default function LandingPage() {
  const headingRef = useRef(null);

  // Carousel images
  const images = [
     "/hostel1.jpg",
    "/hostel2.jpg",
    "/hostel3.jpg",
    "/hostel4.jpg",

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // GSAP Typing Animation
  useEffect(() => {
    gsap.to(headingRef.current, {
      duration: 5,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      text: "Welcome to my Website 🚀",
      ease: "none",
    });
  }, []);

  // Carousel auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Manual Navigation
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 md:px-16 pt-24 space-y-10">
      {/* Top Section (Carousel) */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-5xl h-[250px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-green-600"
      >
        {/* Image */}
        <img
          src={images[currentIndex]}
          alt="Carousel"
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows (slightly above bottom) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6">
          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="bg-green-600 hover:bg-green-700 text-white border-2 border-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="bg-green-600 hover:bg-green-700 text-white border-2 border-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>

      {/* Bottom Section (Text Content) */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl bg-gray-800 text-center space-y-6 border-2 border-white rounded-xl p-8 shadow-lg"
      >
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-green-500"
        >
          {/* GSAP will inject text here */}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg leading-relaxed text-gray-300"
        >
          University Institute of Engineering & Technology (UIET) was
          established by Kurukshetra University in 2004 with objective to
          develop as a "Centre of Excellence" and offer quality technical
          education and to undertake research in Engineering & Technology.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg leading-relaxed text-gray-300"
        >
          Presently, the institute is offering six B. Tech Courses (Computer
          Science & Engineering, Computer Science & Engineering (AI & ML),
          Electronics and Communication Engineering, Electrical & Computer
          Engineering, Biotechnology and Mechanical Engineering) and seven M.
          Tech. courses in the technically important disciplines Computer
          Science & Engineering, Electronics and Communication Engineering,
          Mechanical Engg. (with the specialization of Industrial & Production
          Engg., and Thermal Engg.), Biotechnology, Defence Technology and
          Electrical Engg.
        </motion.p>
      </motion.div>
    </main>
  );
}
