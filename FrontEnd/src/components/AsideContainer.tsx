import { useState } from 'react';
import ButtonModel from "./Reusable/ButtonModel.tsx";
import CardUserProfile from "./CardUserProfile.tsx";
import { useNavigate } from 'react-router-dom';
import { useSidePanel } from '../context/ContextSidePanel.tsx';

const Aside = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const navigate = useNavigate();

    const isLoged = () => {
        if (localStorage.getItem("user")) {
            return true;
        }
    }

    const { isMenuActive, setIsMenuActive } = useSidePanel();

    return (
        <section className="flex flex-row min-w-60 grow justify-end md:justify-start lg:justify-start items-center gap-5 p-3 border bg-gray-900 text-white rounded-lg border-black shadow-[0_3px_10px_rgb(0,0,0,0.5)] shadow-blue-950">

            {/* Aside en teléfono (Se oculta en PC y Tablet) */}

            <section className='flex md:hidden lg:hidden'>
                <ButtonModel
                    type="onlyIcon"
                    iconName='menu'
                    buttonFunction={() => {
                        if (!isMenuActive) {
                            setIsMenuActive(true);
                            console.log("MENU:", isMenuActive);

                        } else {
                            setIsMenuActive(false)
                            console.log("MENU:", isMenuActive);

                        }
                    }}
                />
            </section>


            {/* Aside en PC y Tablet (Se oculta en resoluciones de teléfono) */}
            <div className='h-full w-full hidden md:flex lg:flex flex-col'>

                <img className="select-none w-20 hidden md:flex cursor-pointer"
                    src="/Images/Logo 22.jpg"
                    alt="Logo"
                    onClick={() => navigate("/")
                    } />

                <article className="h-full w-full hidden md:flex md:flex-col items-start justify-between gap-1.5 mt-2 overflow-hidden">
                    <div className='w-full flex md:flex-col items-start justify-start'>
                        <ButtonModel
                            text="Inicio"
                            type="invisible"
                            route="/"
                            iconName="home"
                        />
                        <ButtonModel
                            text="Nosotros"
                            type="invisible"
                            route="/"
                            iconName="us"
                        />
                        <ButtonModel
                            text="Ofertas"
                            type="invisible"
                            route="/"
                            iconName="dollar"
                        />
                    </div>

                    <div className="relative w-full flex md:flex-col items-start justify-start ga">

                        {/* Número de items en el carrito */}
                        <div className="absolute left-6 top-1 rounded-full bg-blue-400 w-6 h-4 flex items-center justify-center">3</div>

                        <ButtonModel
                            text="Carrito"
                            type="invisible"
                            route="/"
                            iconName="cart"
                        />
                        <ButtonModel
                            text="Favoritos"
                            type="invisible"
                            route="/WishList"
                            iconName="star"
                        />

                        {/*NO TOCAR*/}
                        <div className="w-full flex flex-col items-center justify-center overflow-hidden">

                            <div className={`absolute flex flex-col gap-2 p-3 ${isHovered ? "flex" : "hidden"} bottom-20 rounded-sm bg-gray-800 z-1`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}>

                                <span>Menú</span>

                                <ButtonModel
                                    text="Ver Perfil"
                                    type="primary"
                                    route="/"
                                    iconName="user"
                                />
                                <ButtonModel
                                    text="Cerrar Sesión"
                                    type="danger"
                                    route="/login"
                                    iconName="close"
                                    buttonFunction={() => { localStorage.removeItem("user") }}

                                />
                            </div>


                            {isLoged() ? <CardUserProfile setIsHovered={setIsHovered} /> :
                                <ButtonModel
                                    text="Iniciar Sesión"
                                    type="primary"
                                    route="/login"
                                    iconName="user"
                                />}
                        </div>
                    </div>
                </article>
            </div>
        </section >
    )
}

export default Aside;