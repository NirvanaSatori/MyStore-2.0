import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { Navbar, Products } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])
  
  // console.log(products)

  return (
    <Router>
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
      <Switch>
        <Route exact path="/">
          <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
        </Route>
        <Route exact path="/cart">
          <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
        </Route>
        <Route path="/checkout" exact>
          <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
        </Route>
      </Switch>
    </div>
  </Router>
  )
}

export default App
