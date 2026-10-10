const productSections = [
  { title: "আজকের সবজি", count: 6 },
  { title: "আজকের ফলমূল", count: 6 },
  { title: "মাছ ও মাংস", count: 18 },
];

function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-gray-200/80 ${className}`}
    />
  );
}

function ProductCard() {
  return (
    <div className="flex min-h-[78px] flex-col justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2.5">
        <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />

        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-3 w-20 max-w-full" />
          <Skeleton className="h-2 w-12" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <Skeleton className="h-2.5 w-14" />
        <Skeleton className="h-4 w-10 rounded-full" />
      </div>
    </div>
  );
}

function ProductSection({ title, count }) {
  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center gap-2">
        <Skeleton className="h-4 w-1 rounded-full" />
        <Skeleton className="h-4 w-32 max-w-[70%]" />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCard key={`${title}-${index}`} />
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <main
      aria-label="Page loading"
      aria-busy="true"
      className="min-h-screen bg-[#202020]"
    >
      {/* Top page label */}
      <div className="mx-auto max-w-[1120px] px-4 py-2">
        <Skeleton className="h-3 w-16 bg-gray-600" />
      </div>

      {/* Website container */}
      <div className="mx-auto min-h-screen max-w-[1120px] bg-[#f0f5f1]">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-16" />
              </div>
            </div>

            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          {/* Navigation */}
          <div className="mt-4 flex gap-4 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-3 w-16 shrink-0"
              />
            ))}
          </div>
        </header>

        {/* Main content */}
        <div className="mx-auto max-w-[1000px] px-3 py-5 sm:px-6 sm:py-7">
          {/* Hero banner */}
          <div className="flex min-h-[145px] items-center justify-between gap-4 rounded-2xl bg-white p-5 sm:p-7">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-6 w-full max-w-[310px]" />
              <Skeleton className="h-3 w-full max-w-[360px]" />
              <Skeleton className="h-3 w-4/5 max-w-[290px]" />
              <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
            </div>

            <div className="hidden shrink-0 items-center justify-center sm:flex">
              <Skeleton className="h-24 w-24 rounded-2xl" />
            </div>
          </div>

          {/* Product sections */}
          {productSections.map((section) => (
            <ProductSection
              key={section.title}
              title={section.title}
              count={section.count}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
