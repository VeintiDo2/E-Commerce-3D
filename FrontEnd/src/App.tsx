import { Routes, Route } from 'react-router-dom';
import Store from './pages/Store.tsx';
import Product from "./pages/Product.tsx"
import Login from "./pages/Login.tsx"
import WishList from './pages/WishList.tsx';
import './App.css'

function App() {

  return (
    <Routes>

      <Route path="/" element={<Store />} />

      <Route path='/Login' element={<Login />} />

      <Route path="/Product" element={<Product />} />

      <Route path='/WishList' element={<WishList />} />

    </Routes>
  )
}

export default App