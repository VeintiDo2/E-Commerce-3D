import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ProductProvider } from "./context/ContexProduct.tsx"
import { UserProvider } from "./context/ContexUser.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <UserProvider>
            <ProductProvider>
                <App />
            </ProductProvider>
        </UserProvider>
    </>,
)
