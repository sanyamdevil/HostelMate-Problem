
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallelScrollLanding() {
  const ref = useRef(null);

  // Scroll progress for parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Different depth layer transforms
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);   // slowest
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);  // fastest

  return (
    <main
      ref={ref}
      className="relative w-full h-[300vh] overflow-hidden bg-white"
    >
      {/* ===== Background Parallax Layers ===== */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-[url('/hostel5.png')] bg-cover bg-center opacity-60"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 bg-[url('/hostel2.jpg')] bg-cover bg-center opacity-50 mix-blend-overlay"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 bg-[url('/hostel3.jpg')] bg-cover bg-center opacity-60 mix-blend-screen"
      />
      <motion.div
        style={{ y: y4 }}
        className="absolute inset-0 bg-[url('/hostel6.jpg')] bg-cover bg-center opacity-40"
      />

      {/* ===== Foreground Content ===== */}
      <section className="relative z-20 h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-extrabold text-gray-900 drop-shadow-md">
          🚀 Simplify Hostel Living
        </h1>
        <p className="max-w-2xl mt-6 text-lg text-gray-800">
           Managing{" "}
          <span className="text-green-800 font-semibold"> problems </span> can
           has never been this easy. Report and resolve issues—all in one place.
        </p>
      </section>

      <section className="relative z-20 h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-bold text-gray-900 drop-shadow-md">
          ✨ Your Comfort, Our Priority
        </h2>
        <p className="max-w-2xl mt-6 text-lg font-extrabold text-gray-700">
           From maintenance requests to facility concerns, we make sure your {" "}
          <span className="text-green-900">Hostel Experience</span> is hassle-free.
        </p>
      </section>

      <section className="relative z-20 h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-bold text-green-900 drop-shadow-md">
          🌌 One Click Away From a Better Stay
        </h2>
        <p className="max-w-2xl mt-6 text-lg font-extrabold text-gray-700">
          With our streamlined system, your{" "}
          <span className="text-green-900 font-bold">
            problems
          </span>{" "}
             don’t pile up—they get solved.
        </p>
      </section>
    </main>
  );
}
