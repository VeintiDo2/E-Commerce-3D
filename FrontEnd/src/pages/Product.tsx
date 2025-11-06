import Aside from "../components/AsideContainer.tsx";
import ProductDetails from "../components/ProductDetails.tsx";

const Product = () => {
    document.title = "UltraTec - Product";

    return (
        <main className="flex flex-col md:flex-row gap-2 min-h-screen h-full md:h-0 p-2 bg-gray-800">
            <Aside />
            <article className="w-full flex flex-col items-center justify-center gap-2">
                <ProductDetails />
            </article>
        </main>
    )
}

export default Product;