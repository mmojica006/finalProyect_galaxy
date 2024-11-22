import { Route, Routes } from 'react-router-dom'
import { About, Category, Home, Products, SingleProduct } from '../Pages'

export default function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/category" element={<Category />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:productId" element={<SingleProduct />} />
    </Routes>
  )
}
