"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

const toBn = (num) => {
    if (num === undefined || num === null || isNaN(num)) return "—";
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(num).replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

export default function MarketComparisonPage() {
    const [products, setProducts] = useState([]);
    const [selectedSlug, setSelectedSlug] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    // "https://api.api-store.workers.dev/api/bazardor/products"
                    // "https://api.abcz.workers.dev/api/bazardor/products"
                    "https://openapi.programming-hero.com/api/bazardor/products"
                );
                if (!res.ok) throw new Error("ডেটা লোড করা যায়নি");
                const data = await res.json();
                setProducts(data);
                if (data.length > 0) {
                    setSelectedSlug(data[0].slug);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const selectedProduct = useMemo(
        () => products.find((p) => p.slug === selectedSlug) || null,
        [products, selectedSlug]
    );

    const stats = useMemo(() => {
        const markets = selectedProduct?.markets;
        if (!markets || markets.length === 0) {
            return { min: null, max: null, avg: null, count: 0 };
        }

        const mins = markets.map((m) => m.min);
        const maxs = markets.map((m) => m.max);
        const overallMin = Math.min(...mins);
        const overallMax = Math.max(...maxs);
        const totalMin = mins.reduce((a, b) => a + b, 0);
        const totalMax = maxs.reduce((a, b) => a + b, 0);
        const avg = Math.round((totalMin + totalMax) / (markets.length * 2));

        return {
            min: overallMin,
            max: overallMax,
            avg,
            count: markets.length,
        };
    }, [selectedProduct]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#05893E] border-t-transparent"></div>
                    <p className="text-gray-600">ডেটা লোড হচ্ছে...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FA] px-4 text-center">
                <p className="text-lg font-medium text-red-600">⚠️ {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-md bg-[#05893E] px-5 py-2 text-white transition-colors hover:bg-[#046c31]"
                >
                    আবার চেষ্টা করুন
                </button>
            </main>
        );
    }

    const hasMarkets = selectedProduct?.markets && selectedProduct.markets.length > 0;

    return (
        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">বাজার তুলনা</h1>
                    <p className="mt-1 text-sm text-gray-600 sm:text-base">
                        একটি পণ্য বেছে নিয়ে বিভাগভিত্তিক দাম পাশাপাশি দেখুন।
                    </p>
                </div>

                {/* Product Selection Section */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-6">
                    <label className="mb-2 block text-sm font-medium text-gray-800 sm:mb-3 sm:text-base">
                        পণ্য নির্বাচন করুন
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <select
                            value={selectedSlug}
                            onChange={(e) => setSelectedSlug(e.target.value)}
                            className="w-full flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-[#05893E] focus:outline-none focus:ring-1 focus:ring-[#05893E]"
                        >
                            {products.map((product) => (
                                <option key={product.slug} value={product.slug}>
                                    {product.nameBn}
                                </option>
                            ))}
                        </select>

                        <Link
                            href={`/product/${selectedProduct?.slug || ""}`}
                            className="flex w-full items-center justify-center rounded-md border border-gray-900 bg-white px-6 py-2.5 font-medium text-gray-900 transition-colors hover:bg-gray-50 sm:w-auto shrink-0"
                        >
                            বিস্তারিত দেখুন
                        </Link>
                    </div>
                </div>

                {/* Product Info Card & Stats */}
                {selectedProduct && (
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-6">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                                {selectedProduct.image}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                    {selectedProduct.nameBn}
                                </h2>
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    প্রতি {selectedProduct.unit === "kg" ? "কেজি" : selectedProduct.unit}-এর আজকের দাম {toBn(selectedProduct.today)} টাকা
                                </p>
                            </div>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4">
                                <p className="mb-1 text-xs text-gray-500 sm:text-sm">সর্বনিম্ন</p>
                                <p className="text-lg font-bold text-green-600 sm:text-xl">
                                    {toBn(stats.min)} {stats.min !== null && "টাকা"}
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4">
                                <p className="mb-1 text-xs text-gray-500 sm:text-sm">সর্বাধিক</p>
                                <p className="text-lg font-bold text-red-600 sm:text-xl">
                                    {toBn(stats.max)} {stats.max !== null && "টাকা"}
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4">
                                <p className="mb-1 text-xs text-gray-500 sm:text-sm">গড়</p>
                                <p className="text-lg font-bold text-[#05893E] sm:text-xl">
                                    {toBn(stats.avg)} {stats.avg !== null && "টাকা"}
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4">
                                <p className="mb-1 text-xs text-gray-500 sm:text-sm">বাজার সংখ্যা</p>
                                <p className="text-lg font-bold text-gray-900 sm:text-xl">
                                    {toBn(stats.count)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table Section */}
                {hasMarkets ? (
                    <div>
                        <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
                            বাজারভিত্তিক দাম
                        </h2>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                            <table className="w-full min-w-[600px] text-left text-sm text-gray-700">
                                <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="px-4 py-3.5 font-medium sm:px-6">বাজার</th>
                                        <th className="px-4 py-3.5 font-medium sm:px-6">বিভাগ</th>
                                        <th className="px-4 py-3.5 font-medium sm:px-6">সর্বনিম্ন</th>
                                        <th className="px-4 py-3.5 font-medium sm:px-6">সর্বাধিক</th>
                                        <th className="px-4 py-3.5 font-medium text-right sm:px-6">গড়</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {selectedProduct.markets.map((row, idx) => {
                                        const rowAvg = Math.round((row.min + row.max) / 2);
                                        return (
                                            <tr
                                                key={idx}
                                                className="transition-colors hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3.5 font-medium text-gray-900 sm:px-6">{row.market}</td>
                                                <td className="px-4 py-3.5 sm:px-6">{row.division}</td>
                                                <td className="px-4 py-3.5 sm:px-6">{toBn(row.min)} টাকা</td>
                                                <td className="px-4 py-3.5 sm:px-6">{toBn(row.max)} টাকা</td>
                                                <td className="px-4 py-3.5 text-right font-semibold text-gray-900 sm:px-6">
                                                    {toBn(rowAvg)} টাকা
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    selectedProduct && (
                        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                            এই পণ্যের জন্য কোনো বাজারের ডেটা পাওয়া যায়নি।
                        </div>
                    )
                )}
            </div>
        </main>
    );
}