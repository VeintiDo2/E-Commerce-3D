import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ProductProvider } from "./context/ContexProduct.tsx"
import { UserProvider } from "./context/ContexUser.tsx";
import { SidePanelProvider } from './context/ContextSidePanel.tsx';
import { ModelViewerProvider } from './context/ContexModelViewer.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <>
        <BrowserRouter>
            <UserProvider>
                <ProductProvider>
                    <ModelViewerProvider>
                        <SidePanelProvider>
                            <App />
                        </SidePanelProvider>
                    </ModelViewerProvider>
                </ProductProvider>
            </UserProvider >
        </BrowserRouter>
    </>,
)
