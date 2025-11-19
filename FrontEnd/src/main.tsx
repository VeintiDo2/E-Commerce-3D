import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ProductProvider } from "./context/ContexProduct.tsx"
import { UserProvider } from "./context/ContexUser.tsx";
import { SidePanelProvider } from './context/ContextSidePanel.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <>
        <BrowserRouter>
            <UserProvider>
                <ProductProvider>
                    <SidePanelProvider>
                        <App />
                    </SidePanelProvider>
                </ProductProvider>
            </UserProvider >
        </BrowserRouter>
    </>,
)
