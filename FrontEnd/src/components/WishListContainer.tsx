import { icons } from "../data/IconComponents";



const WishListContainer = () => {
    return (
        <main
            className="relative h-full w-full max-w-600 flex flex-col items-start gap-2 p-2 overflow-y-auto bg-gray-900 text-white rounded-lg shadow-blue-950 border border-black shadow-[0_3px_10px_rgb(0,0,0,0.5)]"
        >
            <div className="flex flex-col w-full items-center justify-center">
                <span className="h-20 w-20 text-yellow-400" >{icons.star}</span>
                <h1 className="text-5xl">Tu lista de deseos</h1>
            </div>

            

        </main>
    );
}

export default WishListContainer;