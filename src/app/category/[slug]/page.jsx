"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const API_BASE = "https://api.api-store.workers.dev/api/bazardor";

const getArray = (response, keys = []) => {
    if (Array.isArray(response)) return response;

    for (const key of keys) {
        if (Array.isArray(response?.[key])) {
            return response[key];
        }
    }

    if (Array.isArray(response?.data)) {
        return response.data;
    }

    if (Array.isArray(response?.data?.data)) {
        return response.data.data;
    }

    return [];
};

const fetchJSON = async (url) => {
    const response = await fetch(url, {
        cache: "no-store",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            `API Error: ${response.status} ${response.statusText}`,
        );
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
        throw new Error("API থেকে JSON data পাওয়া যায়নি।");
    }

    return response.json();
};

const fetchAllProducts = async () => {
    const response = await fetchJSON(`${API_BASE}/products`);

    return getArray(response, ["products", "data"]);
};

const fetchAllCategories = async () => {
    const response = await fetchJSON(`${API_BASE}/categories`);

    return getArray(response, ["categories", "data"]);
};

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

const toBn = (value) => {
    if (value === null || value === undefined) return "";

    return String(value).replace(/\d/g, (digit) => BN_DIGITS[digit]);
};

const getUnit = (unit) => {
    const units = {
        kg: "কেজি",
        gram: "গ্রাম",
        litre: "লিটার",
        ml: "মিলি",
        piece: "পিস",
        dozen: "ডজন",
    };

    return units[String(unit || "").toLowerCase()] || unit || "পিস";
};

const getProductCategorySlug = (product) => {
    const category = product.category;

    if (typeof category === "object" && category !== null) {
        return (
            category.slug ||
            category.categorySlug ||
            category.nameBn ||
            category.name ||
            ""
        );
    }

    return (
        product.categorySlug ||
        product.category_slug ||
        (typeof category === "string" ? category : "") ||
        ""
    );
};

const filterProductsByCategory = (products, slug, category) => {
    const normalizedSlug = String(slug || "").toLowerCase();

    const categoryId = String(category?.id ?? category?._id ?? "");

    return products.filter((product) => {
        const productSlug = String(
            getProductCategorySlug(product),
        ).toLowerCase();

        const productCategoryId = String(
            product.categoryId ??
            product.category_id ??
            product.category?.id ??
            product.category?._id ??
            "",
        );

        return (
            productSlug === normalizedSlug ||
            (categoryId !== "" && productCategoryId === categoryId)
        );
    });
};

export default function CategoryPage() {
    const params = useParams();
    const slug = Array.isArray(params?.slug)
        ? params.slug[0]
        : params?.slug;

    const [category, setCategory] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sort, setSort] = useState("default");

    useEffect(() => {
        if (!slug) return;

        let cancelled = false;

        const loadData = async () => {
            setLoading(true);
            setError("");

            try {
                const [products, categories] = await Promise.all([
                    fetchAllProducts(),
                    fetchAllCategories(),
                ]);

                if (cancelled) return;

                const currentCategory =
                    categories.find(
                        (item) =>
                            String(item.slug || "").toLowerCase() ===
                            String(slug).toLowerCase(),
                    ) || null;

                setCategory(currentCategory);
                setAllProducts(products);
            } catch (err) {
                if (cancelled) return;

                console.error("Category API error:", err);
                setError(
                    err.message ||
                    "ডেটা লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    const categoryProducts = useMemo(() => {
        return filterProductsByCategory(
            allProducts,
            slug,
            category,
        );
    }, [allProducts, slug, category]);

    const sortedProducts = useMemo(() => {
        const list = [...categoryProducts];

        if (sort === "low-high") {
            list.sort(
                (a, b) => Number(a.today ?? 0) - Number(b.today ?? 0),
            );
        } else if (sort === "high-low") {
            list.sort(
                (a, b) => Number(b.today ?? 0) - Number(a.today ?? 0),
            );
        } else if (sort === "name") {
            list.sort((a, b) =>
                String(a.nameBn || a.name || "").localeCompare(
                    String(b.nameBn || b.name || ""),
                    "bn",
                ),
            );
        }

        return list;
    }, [categoryProducts, sort]);

    const { risers, fallers } = useMemo(() => {
        const withChange = categoryProducts.filter(
            (product) => Number(product.change?.pct ?? 0) !== 0,
        );

        const risers = withChange
            .filter((product) => product.change?.dir === "up")
            .sort(
                (a, b) =>
                    Number(b.change?.pct ?? 0) -
                    Number(a.change?.pct ?? 0),
            )
            .slice(0, 5);

        const fallers = withChange
            .filter((product) => product.change?.dir === "down")
            .sort(
                (a, b) =>
                    Number(a.change?.pct ?? 0) -
                    Number(b.change?.pct ?? 0),
            )
            .slice(0, 5);

        return { risers, fallers };
    }, [categoryProducts]);

    const categoryName =
        category?.nameBn || category?.name || slug;

    const categoryIcon = category?.icon;

    const isEmpty = !loading && !error && sortedProducts.length === 0;

    if (isEmpty) {
        return (
            <main className="flex min-h-[65vh] items-center justify-center bg-[#F5F7F5] px-4 py-12">
                <div className="w-full max-w-2xl rounded-2xl border border-[#E3E8E3] bg-white p-10 text-center sm:p-16">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-[#F0F5F0] text-4xl">
                        🔍
                    </div>

                    <h2 className="mt-5 text-4xl font-bold text-[#1D271F] sm:text-5xl">
                        ৪০৪
                    </h2>

                    <p className="mt-3 text-base font-semibold text-[#1D271F] sm:text-lg">
                        কোনো পণ্য পাওয়া যায়নি
                    </p>

                    <p className="mt-1.5 text-sm text-gray-500">
                        এই ক্যাটাগরিতে কোনো আইটেম নেই অথবা লিঙ্কটি সঠিক নয়।
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#07883D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#066b31]"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F5F7F5] pb-12">
            <div className="mx-auto w-full max-w-7xl px-3 sm:px-4">

                {/* Category Header */}
                <div className="mt-5 rounded-2xl border border-[#E3E8E3] bg-white p-5 sm:p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-3xl">
                            {categoryIcon}
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-xl font-bold text-[#1D271F] sm:text-2xl">
                                {categoryName}
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                {toBn(sortedProducts.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div
                        role="alert"
                        className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}

                {/* Sorting */}
                <div className="mt-5 flex items-center justify-end gap-3 rounded-2xl border border-[#E3E8E3] bg-white px-4 py-3 sm:px-6">
                    <label
                        htmlFor="sort"
                        className="text-sm font-medium text-gray-600"
                    >
                        সাজান
                    </label>

                    <select
                        id="sort"
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                        className="rounded-lg border border-[#DFE7DF] bg-white px-3 py-2 text-sm text-[#1D271F] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low-high">কম থেকে বেশি</option>
                        <option value="high-low">বেশি থেকে কম</option>
                        <option value="name">নাম অনুসারে</option>
                    </select>
                </div>

                {/* Product Count */}
                <p className="mt-5 text-sm text-gray-600">
                    মোট {toBn(sortedProducts.length)} টি পণ্য দেখানো হচ্ছে
                </p>

                {/* Products */}
                {loading ? (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-[150px] animate-pulse rounded-2xl bg-white"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedProducts.map((product, index) => (
                            <ProductCard
                                key={product.id ?? product._id ?? index}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

function ProductCard({ product }) {
    const price = Number(product.today ?? 0);
    const change = Number(product.change?.pct ?? 0);
    const isUp = product.change?.dir === "up";
    const isDown = product.change?.dir === "down";

    return (
        <Link href={`/product/${product.slug}`} className="rounded-2xl border border-[#E3E8E3] bg-white p-5 transition hover:border-green-200 hover:shadow-sm">
            <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                    {product.image}
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-[#1D271F]">
                        {product.nameBn || product.name || "পণ্যের নাম নেই"}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        প্রতি {getUnit(product.unit)}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-2">
                <div className="flex flex-col">
                    <span className="text-[12px] font-normal text-[#1D271F]">
                        আজকের দাম
                    </span>

                    <p className="flex items-center text-xl font-bold text-[#1D271F]">
                        {toBn(price.toLocaleString("bn-BD"))}
                        <span className="ml-2 text-[14px] font-medium">টাকা</span>
                    </p>
                </div>

                {isUp || isDown ? (
                    <span
                        className={`text-xs font-semibold bg-[#F0F5F0] px-2 py-1 rounded-xl ${isUp ? "text-red-500" : "text-green-600"
                            }`}
                    >
                        {isUp ? "▲" : "▼"} {toBn(Math.abs(change))}%
                    </span>
                ) : (
                    <span className="text-xs font-semibold bg-[#F0F5F0] px-2 py-1 rounded-xl text-[#1D271F]">
                        -0.0%
                    </span>
                )}
            </div>
        </Link>
    );
}