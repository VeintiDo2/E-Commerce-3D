import { createContext, useContext, useState } from "react";

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
                } fixed h-full left-0 top-0 z-50 bg-gray-800 border border-black overflow-hidden transition-all duration-300`}>
                <div className="p-4 text-white">
                    <h2>Menú Lateral</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
            </aside>

            {/* Overlay/Backdrop opcional para cerrar al hacer click */}
            {isMenuActive && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50  lg:hidden"
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