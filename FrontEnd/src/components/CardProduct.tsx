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
        <div className="flex flex-col lg:flex-row w-full md:h-125 lg:h-50 bg-gray-800 rounded-lg overflow-hidden border-2 border-black shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => {
                navigate("/Product");
                setSelectedProductID(product._id);
            }}>

            {/* Imagen */}
            <div className="flex items-center justify-center">
                <img
                    className="object-contain bg-black w-full md:w-75 aspect-square"
                    src={`http://localhost:5000/${product.productImageUrl}`}
                    alt={product.name}
                />
            </div>

            <div className="w-full p-1 flex flex-col gap-2 justify-between grow">

                {/* Nombre y descripción */}
                <div className="lg:ml-2 md:ml-2 flex flex-col gap-1 grow text-wrap">
                    <span className="lg:text-2xl text-sm">{product.name}</span>
                    <p className="lg:text-sm text-xs text-gray-400 hidden md:block">
                        {product.description}
                    </p>
                </div>

                {/* Precio y botones */}
                <section className="flex flex-col items-start justify-end grow lg:ml-2 md:ml-2">
                    <span className="text-2xl">${product.price}</span>
                    <div className="flex flex-row gap-3">
                        <ButtonModel
                            type="onlyIcon"
                            iconName="star"
                            defaultColor="text-white"
                            activeColor="text-yellow-400"
                            buttonFunction={(event: React.MouseEvent<HTMLElement>) => {
                                event.stopPropagation(); // "event.stopPropagation()" sirve para evitar que el clic en el botón se propague al contendor padre.
                                console.log("Favorito");
                            }}
                        />

                        <ButtonModel
                            text="Agregar"
                            type="primary"
                            iconName="cart"
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