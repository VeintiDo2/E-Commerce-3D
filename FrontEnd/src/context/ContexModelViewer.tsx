import { useState, useEffect, useContext, createContext } from "react"
import { useLocation } from "react-router-dom";
import ModelViewer from "../components/3D/ModelViewer";
import ButtonModel from "../components/Reusable/ButtonModel";

type ViewerProps = {
    isViewerActive: boolean;
    setIsViewerActive: React.Dispatch<React.SetStateAction<boolean>>;
    objectURL: string;
    setObjectURL: React.Dispatch<React.SetStateAction<string>>;
}

const ContextModelViewer = createContext<ViewerProps | undefined>(undefined)

export const ModelViewerProvider = ({ children }: { children: React.ReactNode }) => {
    const [isViewerActive, setIsViewerActive] = useState<boolean>(false);
    const [isWireframeVisible, setIsWireframeVisible] = useState(false);
    const [objectURL, setObjectURL] = useState<string>("");
    const location = useLocation();

    const modelOptions = (active: boolean) => {
        return (
            <section className="absolute flex h-full flex-col justify-between items-center text-white top-0 right-0 p-1">

                <ButtonModel
                    type="onlyIconInvisible"
                    title="Salir"
                    iconName="xMark"
                    buttonFunction={() => {
                        setIsViewerActive(active);
                    }}
                />

                <div className="flex flex-col gap-1">
                    <ButtonModel
                        type="onlyIconInvisible"
                        iconName="cubeTransparent"
                        title="Activar WireFrame"
                        buttonFunction={() => {
                            setIsWireframeVisible(prev => !prev);
                        }}
                    />
                    <ButtonModel
                        type="onlyIconInvisible"
                        iconName="search"
                        title="Salir"
                        buttonFunction={() => {
                            console.log("Rotar");

                        }}
                    />
                    <ButtonModel
                        type="onlyIconInvisible"
                        iconName="search"
                        title="Salir"
                        buttonFunction={() => {
                            console.log("Rotar");

                        }}
                    />
                </div>
            </section>
        )
    }

    // Cerrar el modelViewer al cambiar de página.
    useEffect(() => {
        setIsViewerActive(false);
    }, [location.pathname]);

    return (
        <ContextModelViewer.Provider value={{ isViewerActive, setIsViewerActive, objectURL, setObjectURL }}>
            {children}

            <section className={`${isViewerActive ? "fixed" : "hidden"} top-0 z-100 inset-0 w-full p-12 items-center justify-center `}>
                {objectURL && (
                    <ModelViewer url={`http://localhost:5000/${objectURL}`}
                        canAutoRotate={false}
                        canZoom={true}
                        canRotate={true}
                        canPan={true}
                        component={modelOptions(false)}
                        isWireframeVisible={isWireframeVisible}
                    />
                )}
            </section>

            {isViewerActive && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50 "
                    onClick={() => setIsViewerActive(false)}
                />
            )}

        </ContextModelViewer.Provider>
    );
}

export const useModelViewer = () => {
    const context = useContext(ContextModelViewer);
    if (!context) {
        throw new Error("useModelViewer debe usarse dentro de un ModelViewerProvider")
    }
    return context;
}