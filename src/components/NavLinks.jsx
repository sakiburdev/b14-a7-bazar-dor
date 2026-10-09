"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ navs = [], mobile = false, closeMenu }) => {
  const pathname = usePathname();
  const normalizePath = (path) => path.replace(/\/+$/, "");

  const isCategoryActive = (slug) => {
    return (
      normalizePath(pathname) ===
      normalizePath(`/category/${slug}`)
    );
  };

  if (mobile) {
    return (
      <nav>
        <div className="grid grid-cols-2 gap-2">
          {navs.map((category) => {
            const active = isCategoryActive(category.slug);

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <span className="text-sm sm:text-base">
                  {category.icon}
                </span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div
          className="flex items-center gap-3 overflow-x-auto py-3 sm:gap-4 sm:py-4 lg:gap-5"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {navs.map((category) => {
            const active = isCategoryActive(category.slug);

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium transition sm:text-sm ${active
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
              >
                <span className="text-sm sm:text-base">
                  {category.icon}
                </span>

                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;