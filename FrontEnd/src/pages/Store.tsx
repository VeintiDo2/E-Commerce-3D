import Aside from "../components/AsideContainer.tsx";
import ProductsContainer from "../components/ProductsContainer.tsx";
import ProductsFilter from "../components/ProductsFilter.tsx";

const Store = () => {
    document.title = "UltraTec - Store";

    return (
        <main className="flex flex-col md:flex-row gap-2 min-h-screen h-full md:h-0 p-2 bg-gray-800">
            <Aside />
            <article className="w-full flex flex-col items-center justify-center gap-2">
                <ProductsFilter />
                <ProductsContainer />
            </article>
        </main>
    )
}

export default Store;