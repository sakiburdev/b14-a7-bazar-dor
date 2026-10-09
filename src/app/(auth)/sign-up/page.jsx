"use client";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


const SignUpPage = () => {

    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("পাসওয়ার্ড দুটি মিলছে না। আবার চেষ্টা করুন।");
            return;
        }

        setMessage(" ");
    };

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-5">
            <div className="w-full max-w-[480px]">
                {/* Heading */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-[#1D271F]">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                {/* Sign Up Card */}
                <div className="rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] p-5 sm:p-[22px]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-medium text-[#1D271F]"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="আপনার পুরো নাম"
                                autoComplete="name"
                                required
                                className="w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 py-2.5 text-sm text-[#1D271F] outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium text-[#1D271F]"
                            >
                                ইমেইল
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 py-2.5 text-sm text-[#1D271F] outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-[#1D271F]"
                            >
                                পাসওয়ার্ড
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                autoComplete="new-password"
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 py-2.5 text-sm text-[#1D271F] outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1 block text-sm font-medium text-[#1D271F]"
                            >
                                পাসওয়ার্ড নিশ্চিত করুন
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="আবার লিখুন"
                                autoComplete="new-password"
                                minLength={8}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 py-2.5 text-sm text-[#1D271F] outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#07883D] px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_4px_rgba(0,0,0,0.2)] transition hover:bg-[#067532] active:translate-y-px"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </button>

                        {message && (
                            <p
                                role="status"
                                className="text-center text-sm text-amber-700"
                            >
                                {message}
                            </p>
                        )}
                    </form>

                    {/* Divider */}
                    <div className="my-4 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#DFE3DF]" />
                        <span className="text-xs text-gray-500">অথবা</span>
                        <div className="h-px flex-1 bg-[#DFE3DF]" />
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                setMessage(
                                    "Google sign-in-এর জন্য Better Auth যুক্ত করতে হবে।"
                                )
                            }
                            className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#DFE7DF] px-2 py-2.5 text-xs font-medium text-[#263128] transition hover:bg-green-50 sm:text-sm"
                        >
                            <FcGoogle className="h-4 w-4 shrink-0" />
                            <span>Google দিয়ে চালিয়ে যান</span>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setMessage(
                                    "GitHub sign-in-এর জন্য Better Auth যুক্ত করতে হবে।"
                                )
                            }
                            className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#DFE7DF] px-2 py-2.5 text-xs font-medium text-[#263128] transition hover:bg-green-50 sm:text-sm"
                        >
                            <FaGithub className="h-4 w-4 shrink-0" />
                            <span>GitHub দিয়ে চালিয়ে যান</span>
                        </button>
                    </div>

                    {/* Sign In Link */}
                    <p className="mt-4 text-center text-sm text-[#4B554D]">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/sign-in"
                            className="font-medium text-green-700 hover:text-green-800 hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>
                </div>

                {/* Back Home */}
                <div className="mt-5 text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-500 transition hover:text-green-700"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );

};

export default SignUpPage;