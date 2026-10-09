import HeroBanner from "@/components/HeroBanner";
import AllProducts from "@/components/home/AllProducts";
import PriceFallers from "@/components/home/PriceFallers";
import PriceRisers from "@/components/home/PriceRisers";


export default function Home() {
    return (
        <main className="space-y-6">

            {/* Hero Banner */}
            <HeroBanner />

            {/* Products */}
            <div className="mx-auto mb-12 max-w-7xl space-y-10 px-3 sm:px-4">
                <PriceRisers />
                <PriceFallers/>
                <AllProducts/>
            </div>

        </main>
    );
}