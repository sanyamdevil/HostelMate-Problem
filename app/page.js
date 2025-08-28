"use client"; // App Router (Next.js 13+)

import Spline from "@splinetool/react-spline";
import LandingPage from "./com/extra";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Hero Section with Spline */}
      <section className="relative h-screen w-full">
        <Spline
          scene="https://prod.spline.design/2ZoZh4nsxY87oxFZ/scene.splinecode"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Welcome to{" "}
            <span className="text-green-600">Kurukshetra University</span>
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Developed by Sanyam Mehta
          </p>
          <button
            onClick={() => window.open("https://portfolio-website-delta-dun.vercel.app/", "_blank")}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-500 transition"
          >
            Meet the Developer
          </button>

        </div>
      </section>

      {/* Content Below Hero */}
      <section className="flex-1">
        <LandingPage />
      </section>
    </main>
  );
}

