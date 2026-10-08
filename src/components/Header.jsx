"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";

const Header = () => {
    const [navs, setNavs] = useState([]);
    const [open, setOpen] = useState(false);

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    }); 

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(
                "https://api.api-store.workers.dev/api/bazardor/categories"
            );

            const data = await res.json();

            setNavs(data);
        };

        fetchCategories();
    }, []);

    return (
        <header className="border-b border-gray-200 bg-white">

            {/* Top Header */}
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4">

                {/* Logo + Title */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">

                    {/* Logo */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#05893E] sm:h-[42px] sm:w-[42px] sm:rounded-[12px]">
                        <Image
                            src="/logo-icon.png"
                            alt="বাজার দর"
                            width={25}
                            height={25}
                            priority
                            className="object-contain"
                        />
                    </div>

                    {/* Title */}
                    <div className="min-w-0">
                        <h1 className="truncate text-base font-bold leading-tight text-gray-800 sm:text-xl">
                            বাজার দর
                        </h1>

                        <p className="truncate text-[8px] text-gray-500 sm:text-[10px]">
                            {date}
                        </p>
                    </div>

                </div>

                {/* Desktop Auth */}
                <div className="hidden items-center gap-6 md:flex">

                    <Link
                        href="/sign-in"
                        className="text-sm font-medium text-gray-700 transition hover:text-green-700"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/sign-up"
                        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-green-800"
                    >
                        সাইন আপ
                    </Link>

                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 md:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    <span className="text-lg leading-none">
                        {open ? "✕" : "☰"}
                    </span>

                    <span>মেনু</span>
                </button>

            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <NavLinks navs={navs} />
            </div>

            {/* Mobile Navigation */}
            {open && (
                <div className="border-t border-gray-100 bg-white px-3 py-4 shadow-md md:hidden">

                    <NavLinks
                        navs={navs}
                        mobile={true}
                        closeMenu={() => setOpen(false)}
                    />

                    {/* Mobile Auth */}
                    <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">

                        <Link
                            href="/sign-in"
                            onClick={() => setOpen(false)}
                            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            onClick={() => setOpen(false)}
                            className="flex-1 rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-green-800"
                        >
                            সাইন আপ
                        </Link>

                    </div>

                </div>
            )}

        </header>
    );
};

export default Header;