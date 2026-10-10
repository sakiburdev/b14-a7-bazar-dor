"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
    const [navs, setNavs] = useState([]);
    const [open, setOpen] = useState(false);

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(
                // "https://api.api-store.workers.dev/api/bazardor/categories"
                // "https://api.abcz.workers.dev/api/bazardor/categories"
                "https://openapi.programming-hero.com/api/bazardor/categories"
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
                <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">

                    {/* Logo */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#05893E] sm:h-[42px] sm:w-[42px] sm:rounded-[12px]">
                        <Image
                            src="/logo-icon.png"
                            alt="বাজার দর"
                            width={20}
                            height={20}
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

                </Link>

                {/* Desktop Auth */}
                <UserInfo />

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
                    <UserInfo mobile={true} closeMenu={() => setOpen(false)} />

                </div>
            )}

        </header>
    );
};

export default Header;