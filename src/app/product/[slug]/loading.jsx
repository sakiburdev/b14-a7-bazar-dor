export default function ProductLoading() {
    return (
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6">
            {/* Breadcrumb Skeleton */}
            <nav className="mb-6 flex flex-wrap items-center gap-2">
                <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                <span className="text-gray-300">&gt;</span>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <span className="text-gray-300">&gt;</span>
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            </nav>

            {/* Main Product Card Skeleton */}
            <section className="rounded-3xl border border-[#E1E8E1] bg-white p-6 sm:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    {/* Left: image + text */}
                    <div className="flex items-center gap-5">
                        <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-gray-200" />

                        <div className="flex-1 space-y-3">
                            <div className="h-7 w-48 animate-pulse rounded bg-gray-200 sm:w-64" />
                            <div className="h-4 w-32 animate-pulse rounded bg-gray-200 sm:w-40" />
                            <div className="h-4 w-56 animate-pulse rounded bg-gray-200 sm:w-72" />
                        </div>
                    </div>

                    {/* Right: price badge */}
                    <div className="flex min-w-[150px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl bg-[#F0F5F0] p-6">
                        <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                        <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
                        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
                    </div>
                </div>
            </section>

            {/* Price Summary + Market Table Container */}
            <div className="mt-6 rounded-2xl border border-[#E1E8E1] bg-white p-5">
                {/* Price Summary Section */}
                <section>
                    <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-[#E1E8E1] bg-white p-5"
                            >
                                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                                <div className="mt-2 h-7 w-24 animate-pulse rounded bg-gray-200" />
                                <div className="mt-3 h-3 w-32 animate-pulse rounded bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Market Table Section */}
                <section className="mt-8">
                    <div className="mb-4 h-6 w-56 animate-pulse rounded bg-gray-200" />

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] border-collapse text-left">
                                <thead className="bg-[#F9FAFB]">
                                    <tr>
                                        {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বাধিক", "গড়"].map(
                                            (_, i) => (
                                                <th
                                                    key={i}
                                                    className="border-b border-gray-200 px-6 py-4"
                                                >
                                                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                                                </th>
                                            ),
                                        )}
                                    </tr>
                                </thead>

                                <tbody>
                                    {Array.from({ length: 6 }).map((_, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            className="border-b border-[#E1E8E1] last:border-b-0"
                                        >
                                            {Array.from({ length: 5 }).map((_, colIndex) => (
                                                <td
                                                    key={colIndex}
                                                    className="px-6 py-4"
                                                >
                                                    <div className="h-4 w-full max-w-[100px] animate-pulse rounded bg-gray-200" />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
