export default function Cart({ items, onUpdateItemQuantity }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map(item => (
            <li key={item.id}>
              <div>
                <span>{item.name}</span>
                <span> (${item.price.toFixed(2)})</span>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => onUpdateItemQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateItemQuantity(item.id, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>${total}</strong>
      </p>
    </div>
  );
}
