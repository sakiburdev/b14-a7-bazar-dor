"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PriceRisers = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(
                // "https://api.api-store.workers.dev/api/bazardor/products"
                // "https://api.abcz.workers.dev/api/bazardor/products"
                "https://openapi.programming-hero.com/api/bazardor/products"
            );

            const data = await res.json();
            const risers = data
                .filter((product) => product.change.dir === "up")
                .sort(
                    (a, b) =>
                        b.change.pct - a.change.pct
                )
                .slice(0, 6);

            setProducts(risers);
        };

        fetchProducts();
    }, []);

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4">

            <div className="flex items-center gap-2">

                <span className="text-[16px] text-[#D03739]">
                    ▲
                </span>

                <h2 className="text-xl font-bold text-[#1D271F] sm:text-[20px]">
                    আজ দাম বেড়েছে
                </h2>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">

                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </section>
    );
};

export default PriceRisers;