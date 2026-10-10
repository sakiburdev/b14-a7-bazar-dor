import Link from "next/link";

const getUnit = (unit) => {
    const units = {
        kg: "কেজি",
        gram: "গ্রাম",
        litre: "লিটার",
        ml: "মিলি",
        piece: "পিস",
        dozen: "ডজন",
    };
    return units[unit] || unit;
};

const ProductDetails = async ({ params }) => {
    const { slug } = await params;

    const productsRes = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        { cache: "no-store" }
    );
    const products = await productsRes.json();
    const productInfo = products.find((product) => product.slug === slug);

    if (!productInfo) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
                <div className="mb-6 text-7xl">🧺</div>
                <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                    পাতাটি খুঁজে পাওয়া যায়নি
                </h1>
                <p className="mb-8 max-w-2xl text-base text-gray-600 sm:text-lg">
                    আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে বা কখনো ছিল না।
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="rounded-md bg-[#05893E] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#046e32]"
                    >
                        হোম পেজে যান
                    </Link>
                    <Link
                        href="/market-comparison"
                        className="rounded-md border border-gray-900 bg-white px-6 py-2.5 font-medium text-gray-900 transition-colors hover:bg-gray-100"
                    >
                        বাজার তুলনা দেখুন
                    </Link>
                </div>
            </main>
        );
    }

    const res = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products/${productInfo.id}`,
        { cache: "no-store" }
    );
    const product = await res.json();

    const today = Number(product.today) || 0;
    const yesterday = Number(product.yesterday) || 0;

    let priceChangePct = 0;
    let changeStatus = "unchanged";

    if (yesterday > 0 && today > 0) {
        const diff = today - yesterday;
        priceChangePct = ((diff) / yesterday) * 100;
        if (diff > 0) changeStatus = "up";
        else if (diff < 0) changeStatus = "down";
    }

    let minPrice = 0;
    let maxPrice = 0;
    let avgPrice = 0;

    if (product.markets && product.markets.length > 0) {
        const minValues = product.markets.map((m) => Number(m.min));
        const maxValues = product.markets.map((m) => Number(m.max));
        minPrice = Math.min(...minValues);
        maxPrice = Math.max(...maxValues);
        avgPrice = Math.round((minPrice + maxPrice) / 2);
    }

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6">

            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#1D271F]">
                <Link
                    href="/"
                    className="hover:text-[#05893E] transition-colors"
                >
                    হোম
                </Link>

                <span>&gt;</span>

                {product.category ? (
                    <Link
                        href={`/category/${product.category}`}
                        className="hover:text-[#05893E] transition-colors"
                    >
                        {product.categoryNameBn}
                    </Link>
                ) : (
                    <span>{product.categoryNameBn}</span>
                )}

                <span>&gt;</span>

                <Link
                    href={`/product/${product.slug}`}
                    className="hover:text-[#05893E] font-semibold transition-colors"
                >
                    {product.nameBn}
                </Link>
            </nav>

            {/* Main Product Card */}
            <section className="rounded-3xl border border-[#E1E8E1] bg-white p-6  sm:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-5">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-4xl">
                            {product.image}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-[#1D271F] sm:text-3xl">
                                {product.nameBn}
                            </h1>
                            <p className="mt-1 text-sm text-[#1D271F]/70">
                                প্রতি {getUnit(product.unit)} · {product.categoryNameBn}
                            </p>

                            <p className="mt-1.5 text-sm text-[#1D271F]">
                                গতকালের তুলনায় আজ দাম{" "}
                                <strong className="font-semibold">
                                    {changeStatus === "up" && (
                                        <>
                                            বেড়েছে <span>・</span>{" "}
                                            {priceChangePct.toLocaleString("bn-BD", { maximumFractionDigits: 1 })}%
                                        </>
                                    )}
                                    {changeStatus === "down" && (
                                        <>
                                            কমেছে <span>・</span>{" "}
                                            {Math.abs(priceChangePct).toLocaleString("bn-BD", { maximumFractionDigits: 1 })}%
                                        </>
                                    )}
                                    {changeStatus === "unchanged" && "অপরিবর্তিত"}
                                </strong>
                            </p>
                        </div>
                    </div>

                    {/* Price Badge */}
                    <div className="flex min-w-[150px] shrink-0 flex-col items-center justify-center rounded-xl bg-[#F0F5F0] p-6 text-center">
                        <p className="text-xs text-[#1D271F]/70">আজকের দাম</p>

                        <div className="mt-1 flex flex-col">
                            <span className="text-3xl font-bold text-[#1D271F]">
                                {today.toLocaleString("bn-BD")}
                            </span>
                            <span className="text-sm text-[#1D271F]/70">
                                টাকা / {getUnit(product.unit)}
                            </span>
                        </div>

                        <div
                            className={`mt-1.5 flex items-center gap-1 text-sm font-semibold ${changeStatus === "up"
                                ? "text-[#D92D20]"
                                : changeStatus === "down"
                                    ? "text-[#008A3E]"
                                    : "text-[#1D271F]"
                                }`}
                        >
                            {changeStatus === "up" ? "▲" : changeStatus === "down" ? "▼" : "—"}
                            <span>
                                {Math.abs(product.change?.pct || 0).toLocaleString("bn-BD")}%
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Price Summary Section */}
            <div className="mt-6 border border-[#E1E8E1] rounded-2xl bg-white p-5">
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-[#1D271F]">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {/* Lowest Price Card */}
                        <div className="rounded-2xl border border-[#E1E8E1] bg-white p-5">
                            <p className="text-xs text-[#1D271F]">সর্বনিম্ন দাম</p>
                            <div className="mt-1.5 flex items-baseline gap-1">
                                <span className="text-2xl font-extrabold text-[#05893E]">
                                    {minPrice.toLocaleString("bn-BD")}
                                </span>
                                <span className="text-sm font-medium text-[#1A9951]">টাকা</span>
                            </div>
                            <p className="mt-2 text-xs text-[#1D271F]">সবচেয়ে কম দামের বাজার</p>
                        </div>

                        {/* Highest Price Card */}
                        <div className="rounded-2xl border border-[#E1E8E1] bg-white p-5">
                            <p className="text-xs text-[#1D271F]">সর্বোচ্চ দাম</p>
                            <div className="mt-1.5 flex items-baseline gap-1">
                                <span className="text-2xl font-extrabold text-[#D92D20]">
                                    {maxPrice.toLocaleString("bn-BD")}
                                </span>
                                <span className="text-sm font-medium text-[#D92D20]">টাকা</span>
                            </div>
                            <p className="mt-2 text-xs text-[#1D271F]">সবচেয়ে বেশি দামের বাজার</p>
                        </div>

                        {/* Average Price Card */}
                        <div className="rounded-2xl border border-[#E1E8E1] bg-white p-5">
                            <p className="text-xs text-[#1D271F]">গড় দাম</p>
                            <div className="mt-1.5 flex items-baseline gap-1">
                                <span className="text-2xl font-extrabold text-[#05893E]">
                                    {avgPrice.toLocaleString("bn-BD")}
                                </span>
                                <span className="text-sm font-medium text-[#1A9951]">টাকা</span>
                            </div>
                            <p className="mt-2 text-xs text-[#1D271F]">
                                প্রতি {getUnit(product.unit)}-এর হিসাব
                            </p>
                        </div>
                    </div>
                </section>

                {/* Market Table Section */}
                <section className="mt-8">
                    <h2 className="mb-4 text-lg font-semibold text-[#1D271F]">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] border-collapse text-left">
                                <thead className="bg-[#F9FAFB]">
                                    <tr>
                                        <th className="border-b border-gray-200 px-6 py-4 text-sm font-bold text-[#1D271F]/60">
                                            বাজার
                                        </th>
                                        <th className="border-b border-gray-200 px-6 py-4 text-sm font-bold text-[#1D271F]/60">
                                            বিভাগ
                                        </th>
                                        <th className="border-b border-gray-200 px-6 py-4 text-sm font-bold text-[#1D271F]/60">
                                            সর্বনিম্ন
                                        </th>
                                        <th className="border-b border-gray-200 px-6 py-4 text-sm font-bold text-[#1D271F]/60">
                                            সর্বাধিক
                                        </th>
                                        <th className="border-b border-gray-200 px-6 py-4 text-right text-sm font-bold text-[#1D271F]/60">
                                            গড়
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {product.markets?.map((market, index) => {
                                        const min = Number(market.min);
                                        const max = Number(market.max);
                                        const rawAvg = (min + max) / 2;

                                        const avgFormatted = rawAvg.toLocaleString("bn-BD", {
                                            minimumFractionDigits: rawAvg % 1 === 0 ? 0 : 2,
                                            maximumFractionDigits: 2,
                                        });

                                        return (
                                            <tr
                                                key={market.id || index}
                                                className="border-b border-[#E1E8E1] transition-colors odd:bg-white even:bg-[#F0F5F0] hover:bg-[#F0F5F0] last:border-b-0"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-[#1D271F]">
                                                    {market.market}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-normal text-[#1D271F]">
                                                    {market.division}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-normal text-[#1D271F]">
                                                    {min.toLocaleString("bn-BD")} টাকা
                                                </td>
                                                <td className="px-6 py-4 text-sm font-normal text-[#1D271F]">
                                                    {max.toLocaleString("bn-BD")} টাকা
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-semibold text-[#1D271F]">
                                                    {avgFormatted} টাকা
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ProductDetails;