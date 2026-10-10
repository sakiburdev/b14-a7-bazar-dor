"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const UserInfo = ({ mobile = false, closeMenu }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    if (mobile) {
        return (
            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
                {user ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 px-1">
                            {user.image ? (
                                <img src={user.image} alt={user.name || "User"} className="h-10 w-10 rounded-full object-cover border" />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-bold text-sm">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#1D271F]">{user.name}</p>
                                <p className="truncate text-xs text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        <Link
                            href="/profile"
                            onClick={closeMenu}
                            className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm font-medium text-gray-700"
                        >
                            👤 আমার প্রোফাইল
                        </Link>

                        <button
                            type="button"
                            onClick={() => {
                                handleSignOut();
                                if (closeMenu) closeMenu();
                            }}
                            className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-center text-sm font-medium text-red-600"
                        >
                            ↩ সাইন আউট
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/sign-in" onClick={closeMenu} className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700">
                            সাইন ইন
                        </Link>
                        <Link href="/sign-up" onClick={closeMenu} className="flex-1 rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium text-white">
                            সাইন আপ
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {user ? (
                <div>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2.5 rounded-full p-1 transition hover:bg-gray-100"
                    >
                        {user.image ? (
                            <img src={user.image} alt={user.name || "User"} className="h-9 w-9 rounded-full object-cover border" />
                        ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-white font-bold text-sm">
                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </div>
                        )}
                        <span className="text-sm font-semibold text-[#1D271F] max-w-[120px] truncate hidden sm:inline">
                            {user.name} <span>▼</span>
                        </span>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg py-2 z-50">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-semibold text-[#1D271F] truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                            >
                                👤 আমার প্রোফাইল
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100 mt-1"
                            >
                                ↩ সাইন আউট
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="hidden items-center gap-4 md:flex">
                    <Link href="/sign-in" className="text-sm font-medium text-gray-700 transition hover:text-green-700">
                        সাইন ইন
                    </Link>
                    <Link href="/sign-up" className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-green-800">
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;