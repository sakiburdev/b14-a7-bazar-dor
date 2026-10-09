"use client";
import Link from "next/link";

const NavLinks = ({ navs = [], mobile = false, closeMenu }) => {
  return (
    <nav className={mobile ? "" : "border-t border-gray-100"}>

      <div
        className={
          mobile
            ? "grid grid-cols-2 gap-2"
            : "max-w-7xl px-3 sm:px-1"
        }
      >

        <div
          className={
            mobile
              ? ""
              : "flex min-w-max items-center justify-start gap-6 py-3 sm:justify-center sm:gap-8 sm:py-4 lg:gap-10"
          }
        >

          {navs.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              onClick={closeMenu}
              className={
                mobile
                  ? "flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                  : "flex shrink-0 items-center gap-1 text-xs font-medium text-gray-700 transition hover:text-green-700 sm:text-sm"
              }
            >
              <span className="text-sm sm:text-base">
                {category.icon}
              </span>

              <span>{category.nameBn}</span>
            </Link>
          ))}

        </div>

      </div>

    </nav>
  );
};

export default NavLinks;