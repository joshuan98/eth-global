"use client";
import { Verify } from "@/components/verify";
import "reflect-metadata";

export default function Home() {
  return (
    <div className="mx-auto -mt-32 h-full pt-16">
      <div className="flex h-full w-full items-center justify-center pt-16">
        <div className="flex basis-4/12 flex-col items-center justify-center 2xl:basis-3/12">
          <Verify />
        </div>
      </div>
    </div>
  )
}
