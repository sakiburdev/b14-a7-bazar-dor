"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(
                // "https://api.api-store.workers.dev/api/bazardor/products"
                // "https://api.abcz.workers.dev/api/bazardor/products"
                "https://openapi.programming-hero.com/api/bazardor/products"
            );

            const data = await res.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <section
            id="সব-পণ্য"
            className="space-y-4 pt-2"
        >
            <div>

                <h2 className="text-xl font-bold text-[#1D271F] sm:text-[20px]">
                    সব পণ্য
                </h2>

                <p className="mt-1 text-[14px] text-[#1D271F]/70">
                    মোট{" "}
                    {products.length.toLocaleString("bn-BD")}
                    টি পণ্য দেখানো হচ্ছে
                </p>

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

export default AllProducts;