import { createContext, useContext, useState } from "react";
import ButtonModel from "../components/Reusable/ButtonModel.tsx";

type SidePanelProps = {
    isMenuActive: boolean;
    setIsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContextSidePanel = createContext<SidePanelProps | undefined>(undefined)

export const SidePanelProvider = ({ children }: { children: React.ReactNode }) => {
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

    return (
        <ContextSidePanel.Provider value={{ isMenuActive, setIsMenuActive }}>
            {children}

            {/* Panel lateral - posicionado fijo fuera del flujo */}
            <aside className={`${isMenuActive ? "w-1/2 opacity-100" : "w-0 opacity-0"
                } fixed h-full left-0 top-0 flex flex-col justify-between z-50 bg-gray-900 border border-black overflow-hidden transition-all duration-300 text-white`}>
                <div>
                    <ButtonModel
                        text="Inicio"
                        type="invisible"
                        route="/"
                        iconName="home"
                        showText={true}
                    />
                    <ButtonModel
                        text="Nosotros"
                        type="invisible"
                        route="/"
                        iconName="us"
                        showText={true}
                    />
                    <ButtonModel
                        text="Ofertas"
                        type="invisible"
                        route="/"
                        iconName="dollar"
                        showText={true}
                    />
                </div>

                <div className="relative w-full items-start justify-start gap-0.5">
                    <div className="absolute left-5 top-1 rounded-full bg-blue-400 w-4 h-4 flex items-center justify-center">3</div>
                    <ButtonModel
                        text="Carrito"
                        type="invisible"
                        route="/"
                        iconName="cart"
                        showText={true}
                    />
                    <ButtonModel
                        text="Favoritos"
                        type="invisible"
                        route="/WishList"
                        iconName="star"
                        showText={true}
                    />
                </div>
            </aside>

            {isMenuActive && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50 md:hidden lg:hidden"
                    onClick={() => setIsMenuActive(false)}
                />
            )}
        </ContextSidePanel.Provider>
    )
};

export const useSidePanel = () => {
    const ctx = useContext(ContextSidePanel);
    if (!ctx) {
        throw new Error("UseSidePanel debe usarse dentro de un SidePanelProvider")
    }
    return ctx;
}