import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { Navbar, Products, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));

  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    setCart(await commerce.cart.update(lineItemId, { quantity }));
  };

  const handleRemoveFromCart = async (lineItemId) => {
    setCart(await commerce.cart.remove(lineItemId));

  };

  const handleEmptyCart = async () => {
    setCart(await commerce.cart.empty());
  };

  const refreshCart = async () => {
    setCart(await commerce.cart.refresh());
;
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      setOrder(await commerce.checkout.capture(checkoutTokenId, newOrder));

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])
  
  // console.log(products)
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
          <Routes>
          <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />}/>
            <Route exact path="/cart" element={<Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />}/>
             
            <Route exact path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App
