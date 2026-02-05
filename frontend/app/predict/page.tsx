"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PredictionForm from "@/components/PredictionForm";

export default function Predict() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/auth");
    }
  }, [router]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
             <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">AI Price Estimator</h1>
             <p className="mt-4 text-lg text-gray-600">Get an instant valuation for Renting, Buying, or Land investment.</p>
        </div>

        <PredictionForm />
      </div>
    </div>
  );
}
