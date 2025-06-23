"use client";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Boxes } from "~/components/background-boxes";
import { WobbleCard } from "~/components/wobble-card";
import { cn } from "~/server/util";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <BoxesSection />
      <WobbleCardSection />
      <div className="flex justify-center">
        <Link
          prefetch
          href="/signup"
          className="border flex flex-row gap-2 p-2 rounded-xl bg-black text-white"
        >
          Get Started
          <IconArrowRight />
        </Link>
      </div>
    </div>
  );
}

function BoxesSection() {
  return (
    <div
      style={{ height: "100vh" }}
      className="relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1
        className={cn(
          "md:text-4xl cursor-pointer text-xl text-white relative z-20"
        )}
        onClick={() => redirect("/signup")}
      >
        Tactiq
      </h1>
      <p className="text-center cursor-default mt-2 text-neutral-300 relative z-20">
        Build & Categorize Tasks easily using the power of AI
      </p>
    </div>
  );
}

function WobbleCardSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full p-5">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Generate Meaningful Tasks with the help of AI
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            Automatically generates tasks based on your needs.
          </p>
        </div>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Easily Categorize Tasks into Projects
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Efficiently organize tasks into projects to avoid confusion
        </p>
      </WobbleCard>
    </div>
  );
}
