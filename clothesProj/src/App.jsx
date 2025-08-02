import { useState } from 'react';
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

export default function App() {
  const [shoppingCart, setShoppingCart] = useState({ items: [] });

  function handleAddItemToCart(id) {
    setShoppingCart(prevCart => {
      const updatedItems = [...prevCart.items];
      const existingIndex = updatedItems.findIndex(item => item.id === id);
      const existingItem = updatedItems[existingIndex];

      if (existingItem) {
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1
        };
      } else {
        const product = DUMMY_PRODUCTS.find(p => p.id === id);
        updatedItems.push({
          id,
          name: product.title,
          price: product.price,
          quantity: 1
        });
      }

      return { items: updatedItems };
    });
  }

  function handleUpdateCartItemQuantity(id, change) {
    setShoppingCart(prevCart => {
      const updatedItems = [...prevCart.items];
      const idx = updatedItems.findIndex(item => item.id === id);
      const updatedItem = { ...updatedItems[idx] };

      updatedItem.quantity += change;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(idx, 1);
      } else {
        updatedItems[idx] = updatedItem;
      }

      return { items: updatedItems };
    });
  }

  return (
    <>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop onAddItemToCart={handleAddItemToCart} />
    </>
  );
}
