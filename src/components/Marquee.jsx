import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

const Marquee = async () => {
    const res = await fetch(API_URL, {
        cache: "no-store",
    });

    const data = await res.json();

    const products = Array.isArray(data)
        ? data
        : data.data || data.products || [];

    const getUnit = (unit) => {
        const units = {
            kg: "কেজি",
            gram: "গ্রাম",
            litre: "লিটার",
            ml: "মিলি",
            piece: "পিস",
            dozen: "ডজন",
        };

        return units[unit] || "";
    };

    return (
        <div className="w-full border-b border-gray-200 bg-gray-50">
            <div className="flex w-full overflow-hidden">
                <MarqueeText
                    direction="right"
                    duration={18}
                    className="h-10"
                >
                    {products.map((product) => {
                        const isUp = product.change?.dir === "up";
                        const isDown = product.change?.dir === "down";

                        return (
                            <Link
                                key={product.id}
                                href={`/product/${product.slug}`}
                                className="inline-flex items-center whitespace-nowrap"
                            >
                                {/* Product Icon */}
                                <span className="mr-1.5 text-sm">
                                    {product.image}
                                </span>

                                {/* Product Name */}
                                <span className="text-[11px] font-medium text-gray-700 sm:text-xs">
                                    {product.nameBn}
                                </span>

                                {/* Price */}
                                <span className="ml-1 text-[11px] text-gray-500 sm:text-xs">
                                    {product.today} টাকা/{getUnit(product.unit)}
                                </span>

                                {/* Price Change */}
                                <span
                                    className={`ml-1 text-[10px] font-semibold sm:text-[11px] ${isUp
                                            ? "text-red-600"
                                            : isDown
                                                ? "text-green-600"
                                                : "text-gray-400"
                                        }`}
                                >
                                    {isUp && "▲"}
                                    {isDown && "▼"}
                                    {!isUp && !isDown && "●"}{" "}
                                    {Math.abs(product.change?.pct || 0)}%
                                </span>

                                {/* Separator */}
                                <span className="mx-7 h-10 border-r border-gray-200" />
                            </Link>
                        );
                    })}
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;