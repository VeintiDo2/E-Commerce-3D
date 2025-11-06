import { useState } from 'react';
import ButtonModel from "./Reusable/ButtonModel.tsx";
import CardUserProfile from "./CardUserProfile.tsx";
import { useNavigate } from 'react-router-dom';

const Aside = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const navigate = useNavigate();

    const isLoged = () => {
        if (localStorage.getItem("user")) {
            return true;
        }
    }

    return (
        <aside className=" h-full border  border-black shadow-[0_3px_10px_rgb(0,0,0,0.5)] shadow-blue-950 flex md:flex-col flex-row justify-center items-center gap-5 p-3 bg-gray-900 text-white rounded-lg">
            <img className="select-none w-50 hidden md:flex cursor-pointer" src="/Images/LogoNombre.png" alt="Logo" onClick={() => navigate("/")
            } />
            <article className="h-full hidden md:flex md:flex-col items-start justify-start  gap-1.5 mt-2 w-full overflow-hidden">
                <ButtonModel
                    text="Inicio"
                    type="invisible"
                    route="/"
                    iconName="home"
                    sizeClass="size-6"
                />
                <ButtonModel
                    text="Nosotros"
                    type="invisible"
                    route="/"
                    iconName="us"
                    sizeClass="size-6"
                />
                <ButtonModel
                    text="Ofertas"
                    type="invisible"
                    route="/"
                    iconName="dollar"
                    sizeClass="size-6"
                />
            </article>
            <div className="relative flex md:flex-col items-start justify-start gap-0.5 mt-10 w-full">
                <div className="absolute left-6 top-1 rounded-full bg-blue-400 w-6 h-4 flex items-center justify-center">3</div>
                <ButtonModel
                    text="Carrito"
                    type="invisible"
                    route="/"
                    iconName="cart"
                    sizeClass="size-6"
                />
                <ButtonModel
                    text="Favoritos"
                    type="invisible"
                    route="/"
                    iconName="star"
                    sizeClass="size-6"
                />
            </div>
            <div className="h-25 w-full flex flex-col items-center justify-center overflow-hidden">
                <div className={`absolute flex flex-col gap-2 p-3 ${isHovered ? "flex" : "hidden"} bottom-20 rounded-sm bg-gray-800 z-1`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <span>Menú</span>
                    <ButtonModel
                        text="Ver Perfil"
                        type="primary"
                        route="/"
                        iconName="user"
                        sizeClass="size-6"
                    />
                    <ButtonModel
                        text="Cerrar Sesión"
                        type="danger"
                        route="/login"
                        iconName="close"
                        sizeClass="size-6"
                        buttonFunction={() => { localStorage.removeItem("user") }}
                    />
                </div>
                {isLoged() ? <CardUserProfile setIsHovered={setIsHovered} /> :
                    <ButtonModel
                        text="Iniciar Sesión"
                        type="primary"
                        route="/login"
                        iconName="user"
                        sizeClass="size-6"
                    />}
            </div>
        </aside >
    )
}

export default Aside;