"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <section className="w-full my-4 sm:my-6">

            <div className="mx-auto max-w-7xl px-3 sm:px-4">

                <div className="bg-[#ffffff] border border-[#E1E8E1] rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">

                    {/* Left Side Content */}
                    <div className="flex-1 flex flex-col items-start justify-start space-y-3 sm:space-y-2 w-full">

                        {/* Date */}
                        {date && (
                            <div className="inline-block bg-[#E1F1E7] text-[#05893E] text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                                {date}
                            </div>
                        )}

                        {/* Main Title */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold text-[#1D271F] tracking-tight leading-tight text-left">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#1D271F]/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal text-left">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-<span className="inline-block">সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</span>
                        </p>

                        {/* Button */}
                        <div className="pt-2 w-full sm:w-auto">
                            <Link
                                href="#সব-পণ্য"
                                className="inline-block w-full sm:w-auto text-center bg-[#008a3e] hover:bg-[#007534] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
                            >
                                সব পণ্য দেখুন
                            </Link>
                        </div>

                    </div>

                    {/* Right Side Banner Image */}
                    <div className="w-full md:w-auto flex items-center justify-center flex-shrink-0 self-center">
                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-60 lg:w-72 lg:h-64 flex items-center justify-center">
                            <Image
                                src="/bazar-hero.png"
                                alt="বাজার দর বাস্কেট"
                                width={300}
                                height={260}
                                className="object-contain max-h-full"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}