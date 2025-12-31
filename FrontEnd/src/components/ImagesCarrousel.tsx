import { useState } from "react";
import ButtonModel from "./Reusable/ButtonModel";

type Images = {
    stockImage: string;
    images: string[];
}

type Product = {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: Images;
};

const ImageCarrousel = ({ product }: { product: Product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    if (!product) return (<div>No hay imagenes / productos</div>)

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.images.length);
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.images.length) % product.images.images.length);
    }

    return (
        <section className='w-full relative flex justify-center items-center'>
            <div className="absolute left-1">
                <ButtonModel
                    type="onlyIconInvisible"
                    iconName="arrowLeft"
                    buttonFunction={handlePrevImage}
                />
            </div>
            <div className="absolute right-1">
                <ButtonModel
                    type="onlyIconInvisible"
                    iconName="arrowRight"
                    buttonFunction={handleNextImage}
                />
            </div>

            <div className="flex items-center justify-center">
                <img className="object-contain aspect-square rounded-lg h-100"
                    src={`http://localhost:5000/${product.images.images[currentImageIndex]}`}
                    alt={product.name} />
            </div>
        </section>
    );
}

export default ImageCarrousel;