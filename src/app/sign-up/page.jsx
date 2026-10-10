"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries());

        const { password, confirmPassword, name, email } = user;

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড দুটি মিলছে না। আবার চেষ্টা করুন।");
            return;
        }

        const signUpPromise = authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "/",
        });

        toast.promise(signUpPromise, {
            loading: "অ্যাকাউন্ট তৈরি হচ্ছে...",
            success: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!",
            error: (err) => err?.message || "সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        });

        try {
            const { data, error } = await signUpPromise;
            if (data) {
                router.push("/");
                router.refresh();
            }
            if (error) {
                console.error(error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleGoogleSignUp = async () => {
        const toastId = toast.loading("গুগল দিয়ে রেজিস্ট্রেশন করা হচ্ছে...");
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

        } catch (err) {
            toast.error("গুগল দিয়ে সাইন আপ করতে সমস্যা হয়েছে।", { id: toastId });
            console.error(err);
        }
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
                    </form>

                    {/* Divider */}
                    <div className="my-4 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#DFE3DF]" />
                        <span className="text-xs text-gray-500">অথবা</span>
                        <div className="h-px flex-1 bg-[#DFE3DF]" />
                    </div>

                    <div className="grid grid-cols-1">
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#DFE7DF] px-2 py-2.5 text-xs font-medium text-[#263128] transition hover:bg-green-50 sm:text-sm"
                        >
                            <FcGoogle className="h-4 w-4 shrink-0" />
                            <span>Google দিয়ে চালিয়ে যান</span>
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