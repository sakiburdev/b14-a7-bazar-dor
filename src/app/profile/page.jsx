"use client";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { data: session, refetch } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user]);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সফলভাবে লগআউট হয়েছে!");
                    window.location.href = "/";
                },
            },
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await authClient.updateUser({
                name: name,
            });

            if (error) {
                toast.error(error.message || "আপডেট করতে সমস্যা হয়েছে।");
            } else {
                toast.success("তথ্য আপডেট সফল হয়েছে!");
                refetch();
            }
        } catch (err) {
            toast.error("কোথাও কোনো সমস্যা হয়েছে।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[70vh] bg-[#F5F7F5] px-4 py-8">
            <div className="mx-auto w-full max-w-3xl">
                {/* Page Heading */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1D271F]">
                        আমার প্রোফাইল
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* Profile Card */}
                <div className="rounded-2xl border border-[#E3E8E3] bg-white p-5 sm:p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-4">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name || "User"}
                                    className="h-16 w-16 shrink-0 rounded-xl object-cover border"
                                />
                            ) : (
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white font-bold text-xl">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </div>
                            )}

                            <div className="min-w-0">
                                <h2 className="truncate text-lg font-semibold text-[#1D271F]">
                                    {user?.name}
                                </h2>
                                <p className="truncate text-sm text-gray-500">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-center"
                        >
                            ↩ সাইন আউট
                        </button>
                    </div>
                </div>

                {/* Info / Update Card */}
                <div className="mt-5 rounded-2xl border border-[#E3E8E3] bg-white p-5 sm:p-6 shadow-sm">
                    <h3 className="mb-5 text-base font-semibold text-[#1D271F]">
                        তথ্য
                    </h3>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1.5 block text-sm font-medium text-[#1D271F]"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম"
                                required
                                className="w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 py-2.5 text-sm text-[#1D271F] outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#07883D] px-4 py-3 text-sm font-semibold text-white shadow-[0_3px_4px_rgba(0,0,0,0.2)] transition hover:bg-[#067532] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;