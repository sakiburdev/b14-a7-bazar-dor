"use client";
import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <main className="flex min-h-[75vh] w-full items-center justify-center px-4 py-12 bg-[#F0F5F0]">
            <div className="mx-auto max-w-lg text-center">

                {/* Visual Badge / Vector Concept */}
                <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-3xl bg-green-100/80 p-6 shadow-inner border border-green-200">
                    <span className="text-6xl select-none">🔍</span>
                    <div className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#05893E] text-xs font-bold text-white shadow-md">
                        404
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    পেজটি পাওয়া যায়নি!
                </h1>

                {/* Subtitle */}
                <p className="mt-3 text-base text-gray-600 sm:text-lg">
                    আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে, লিঙ্কটি পরিবর্তন করা হয়েছে অথবা ভুল ইউআরএল (URL) দিয়েছেন।
                </p>

                {/* Quick Suggestion Box */}
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        কী করতে পারেন?
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span> ইউআরএল-এর বানান ঠিক আছে কিনা চেক করুন।
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span> মূল পেজে ফিরে গিয়ে নতুন করে খুঁজুন।
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="w-full sm:w-auto rounded-xl bg-[#05893E] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#046e32] active:scale-95"
                    >
                        🏠 হোম পেজে ফিরে যান
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 active:scale-95"
                    >
                        ← আগের পেজে যান
                    </button>
                </div>
            </div>
        </main>
    );
}