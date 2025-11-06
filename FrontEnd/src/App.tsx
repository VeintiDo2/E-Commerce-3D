import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Store from './pages/Store.tsx';
import Product from "./pages/Product.tsx"
import Login from "./pages/Login.tsx"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Store />} />
       
        <Route path='/Login' element={<Login />} />

        <Route path="/Product" element={<Product />} />

      </Routes>
    </BrowserRouter>)
}

export default App