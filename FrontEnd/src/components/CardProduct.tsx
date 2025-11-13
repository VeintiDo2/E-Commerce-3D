import ButtonModel from "./Reusable/ButtonModel.tsx";
import { useNavigate } from 'react-router-dom';
import { useProduct } from "../context/ContexProduct.tsx";
import type React from "react";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    productImageUrl: string;
}

const CardProduct = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const { setSelectedProductID } = useProduct();

    return (
        <div className="flex flex-col md:flex-col lg:flex-row w-full md:h-100 lg:h-50 bg-gray-800 rounded-lg overflow-hidden border-2 border-black shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => {
                navigate("/Product");
                setSelectedProductID(product._id);
            }}>
            <div className="flex items-center justify-center">
                <img
                    className="object-contain bg-black w-full lg:w-40 md:w-75 aspect-square"
                    src={`http://localhost:5000/${product.productImageUrl}`}
                    alt={product.name}
                />
            </div>
            <div className="w-full p-1 flex flex-col gap-2 justify-between">
                <div className="ml-2 flex flex-col gap-1 grow text-wrap">
                    <span className="lg:text-2xl text-sm">{product.name}</span>
                    <p className="lg:text-sm text-xs text-gray-400">
                        {product.description}
                    </p>
                </div>
                <section className="flex flex-col items-start justify-end grow">
                    <span className="ml-2 text-2xl">${product.price}</span>
                    <div className="flex flex-row gap-3 ml-2">
                        <ButtonModel
                            type="onlyIcon"
                            iconName="star"
                            defaultColor="text-white"
                            activeColor="text-yellow-400"
                            sizeClass="w-6"
                            buttonFunction={(event: React.MouseEvent<HTMLElement>) => {
                                event.stopPropagation(); // "event.stopPropagation()" sirve para evitar que el clic en el botón se propague al contendor padre.
                                console.log("Favorito");
                            }}
                        />
                        <ButtonModel
                            text="Agregar al carrito"
                            type="primary"
                            iconName="cart"
                            sizeClass="w-6"
                            buttonFunction={(event: React.MouseEvent<HTMLElement>) => {
                                event.stopPropagation();
                                console.log("Agregar");
                            }}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CardProduct;