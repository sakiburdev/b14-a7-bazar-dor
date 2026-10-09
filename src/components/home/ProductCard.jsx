import Link from "next/link";

const ProductCard = ({ product }) => {

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

    const isRiser = product.change.dir === "up";
    const isFaller = product.change.dir === "down";

    const badgeStyle = isRiser
        ? "bg-[#F0F5F0] rounded-xl text-[#D03739]"
        : isFaller
            ? "bg-[#F0F5F0] rounded-xl text-[#1A9951]"
            : "bg-[#F4F7F4] text-gray-600";

    const arrow = isRiser ? "▲" : isFaller ? "▼" : "—";

    return (
        <Link href={`/product/${product.slug}`} className="block">
            <div className="flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-[#E1E8E1] bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                
                {/* Product */}
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0]">
                        <span className="text-2xl">{product.image}</span>
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-[16px] text-[#1D271F]">
                            {product.nameBn}
                        </h3>

                        <p className="mt-1 text-[12px] font-normal text-[#1D271F]">
                            প্রতি {getUnit(product.unit)}
                        </p>
                    </div>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[12px] font-normal text-[#1D271F]">আজকের দাম</p>

                        <div className="mt-1 flex items-baseline gap-1.5">
                            <span className="text-lg font-bold text-[#1D271F] sm:text-xl">
                                {Number(product.today).toLocaleString("bn-BD")}
                            </span>

                            <span className="text-[14px] font-medium text-[#1D271F]">টাকা</span>
                        </div>
                    </div>

                    {/* Change */}
                    <div
                        className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${badgeStyle}`}
                    >
                        <span className="text-[10px]">{arrow}</span>

                        <span>{Math.abs(product.change.pct).toLocaleString("bn-BD")}%</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;