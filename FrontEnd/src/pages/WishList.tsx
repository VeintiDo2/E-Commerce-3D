// import { useState, useEffect } from "react";
import Aside from "../components/AsideContainer";
import WishListContainer from "../components/WishListContainer.tsx";

const WishList = () => {
    return (
        <main className="flex flex-col md:flex-row gap-2 min-h-screen h-full md:h-0 p-2 bg-gray-800">
            <Aside />
            <article className="w-full flex flex-col items-center justify-center gap-2">
                <WishListContainer />
            </article>
        </main>
    )
}

export default WishList;