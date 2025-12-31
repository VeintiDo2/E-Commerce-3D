import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

const Model = ({ url, isWireframeVisible }: { url: string, isWireframeVisible?: boolean }) => {
    const gltf = useGLTF(url);

    gltf.scene.traverse((child) => {
        if ((child as any).isMesh) {
            (child as any).material.wireframe = isWireframeVisible;
        }
    });

    return <primitive object={gltf.scene} />;
};

const ModelViewer = ({ url, canAutoRotate, canZoom, canRotate, canPan, component, isWireframeVisible }:
    {
        url: string, canAutoRotate: boolean, canZoom: boolean, canRotate: boolean,
        canPan: boolean, component?: React.ReactNode, isWireframeVisible?: boolean,
    }) => {

    if (!url) return <span className="text-red-400">Modelo no disponible</span>;

    return (
        <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
            <Canvas className="r3f-canvas" camera={{ position: [0, 1, 3], fov: 35 }}>
                <Suspense fallback={null}>

                    <ambientLight intensity={0.5} />
                    <hemisphereLight intensity={1.2} />
                    <Environment preset="studio" />
                    {url ? <Model url={url} isWireframeVisible={isWireframeVisible} /> : null}
                    <OrbitControls autoRotate={canAutoRotate}
                        enableZoom={canZoom}
                        enableRotate={canRotate}
                        enablePan={canPan}
                        maxDistance={5}
                        minDistance={0.2}
                    />

                </Suspense>
            </Canvas>
            {component && (
                <div>
                    {component}
                </div>
            )}
        </div >
    );
};

export default ModelViewer;
