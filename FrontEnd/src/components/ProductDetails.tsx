import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonModel from "./Reusable/ButtonModel.tsx";
import { useProduct } from "../context/ContexProduct.tsx";
import ImageCarrousel from './ImagesCarrousel.tsx';
import ModelViewer from './3D/ModelViewer.tsx';
import { useModelViewer } from '../context/ContexModelViewer.tsx';

type questions = { key: string; value: string };
type Images = { stockImage: string; images: string[] };

type Product = {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: Images;
    vertexNumber: number;
    textured: boolean;
    rigging: boolean;
    uvWrapped: boolean;
    questions: Record<string, questions>;
    objectURL: string;
};

const ProductDetails = () => {
    const productContext = useProduct();
    const selectedProductID = productContext?.selectedProductID ?? "";
    const { setIsViewerActive, setObjectURL } = useModelViewer();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        if (!selectedProductID) {
            const saved = localStorage.getItem("product");
            if (saved) {
                setProduct(JSON.parse(saved));
            }
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:5000/api/products/${selectedProductID}`)
            .then(response => {
                setProduct(response.data.product);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [selectedProductID]);


    useEffect(() => {
        if (product) {
            localStorage.setItem("product", JSON.stringify(product));
        }
    }, [product]);

    const ProductQuestions = () => {
        if (!product || !product.questions) return <span>Cargando detalles...</span>;

        return (
            <>
                {Object.values(product.questions).map((question) => (
                    <section
                        key={question.key}
                        className="w-full text-sm lg:text-base flex flex-col gap-2 rounded border border-blue-500"
                    >
                        <span className="bg-blue-500 p-1">{question.key}</span>
                        <span className="p-1">{question.value}</span>
                    </section>
                ))}
            </>
        );
    };

    const Details = () => {
        if (!product) return <span>Cargando detalles...</span>;
        return (
            <div className="w-full text-sm lg:text-base flex flex-col gap-2 rounded border border-blue-500">
                <span className="bg-blue-500 p-1">Detalles</span>
                <div className='h-full p-1 flex flex-col justify-between'>
                    <span><p className='font-semibold'>Cantidad de vertices:</p> {product.vertexNumber}</span>
                    <span><p className='font-semibold'>Rig:</p> {product.rigging ? "Si" : "No"}</span>
                    <span><p className='font-semibold'>Texturizado:</p> {product.textured ? "Si" : "No"}</span>
                    <span><p className='font-semibold'>UV Wrapped:</p> {product.uvWrapped ? "Si" : "No"}</span>
                </div>
            </div>
        )
    }

    const interactionButton = (active: boolean, url: string) => {
        return (
            <div className="absolute bottom-1 right-1">
                <ButtonModel
                    type="primary"
                    iconName="cube"
                    text="Interactuar"
                    buttonFunction={() => {
                        setIsViewerActive(active);
                        setObjectURL(url);
                    }}
                />
            </div>
        )
    }

    // Si no hay producto selecionado o está cargando, entonces se muestra un placeholder de carga.
    if (loading || !product) {
        return (
            <section className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                <span className="text-xl animate-pulse">Cargando...</span>
            </section>
        );
    }

    return (
        <section
            className="w-full h-full flex flex-col gap-4 max-w-450 mx-auto p-2
             rounded-lg overflow-y-auto border border-black bg-gray-900 text-white"
            style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#4a90e2 #2d3748",
                scrollBehavior: "smooth",
            }}
        >
            {/* ---------------- IMÁGENES + INFO ---------------- */}
            <article className="w-full flex flex-col lg:flex-row gap-4 p-3 rounded border border-black bg-gray-800">

                {/* Carrusel */}
                <div className="w-full h-100 lg:w-1/2 flex items-center justify-center">
                    <ImageCarrousel product={product} />
                </div>

                {/* Información */}
                <aside className="w-full  flex flex-col justify-between">
                    <div>
                        <span className="text-3xl md:text-4xl font-semibold pl-1">
                            {product.name}
                        </span>

                        <p className="text-sm md:text-base text-gray-300 pt-3 pl-1">
                            {product.description}
                        </p>
                    </div>

                    {/* Precio + botones */}
                    <div className="flex flex-col gap-3">
                        <span className="text-2xl md:text-3xl font-semibold pl-1">
                            ${product.price}
                        </span>

                        <div className="w-full flex flex-row gap-3 ml-1">
                            <ButtonModel
                                type="onlyIcon"
                                iconName="star"
                                defaultColor="text-white"
                                activeColor="text-yellow-400"
                                buttonFunction={() => console.log("Favorito")}
                            />

                            <ButtonModel
                                type="primary"
                                iconName="cart"
                                text="Agregar Producto"
                                buttonFunction={() => console.log("Comprar")}
                            />
                        </div>
                    </div>
                </aside>
            </article>

            {/* ---------------- 3D VIEWER + DETALLES ---------------- */}
            <article className="w-full flex flex-col gap-4 p-3 rounded border border-black bg-gray-800">
                <section className='flex flex-col lg:flex-row gap-5'>
                    {/* Visor 3D */}
                    <div className="w-full">
                        <ModelViewer
                            key={product._id}
                            url={`http://localhost:5000/${product.objectURL}`}
                            canAutoRotate={true}
                            canZoom={false}
                            canRotate={false}
                            canPan={false}
                            component={interactionButton(true, product.objectURL)}
                        />
                    </div>
                    <Details />
                </section>

                {/* Preguntas */}
                <section className="w-full flex flex-col gap-2">
                    <span className="text-2xl">Preguntas Frecuentes</span>
                    <ProductQuestions />
                </section>
            </article>
        </section>
    );
};

export default ProductDetails;
