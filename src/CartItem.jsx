import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Helper: convert cost to a number whether it's 15 or "$15"
  const toNumberCost = (cost) =>
    typeof cost === 'number' ? cost : parseFloat(cost.toString().replace(/[^0-9.-]+/g, '') || 0);

  // Grand total for all items
  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => sum + toNumberCost(item.cost) * item.quantity, 0);
    return total.toFixed(2);
  };

  // Subtotal for a single item
  const calculateTotalCost = (item) => {
    return (toNumberCost(item.cost) * item.quantity).toFixed(2);
  };

  // Total items count (for badge / icon)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handlers
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // When quantity would hit 0, remove the item entirely
      dispatch(removeItem(item.name)); // <-- pass the name string
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // <-- pass the name string
  };

  return (
    <div className="cart-container">
      {/* Simple cart count badge at top of cart page */}
      <div className="cart-header" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="cart-icon" aria-label="cart" role="img">🛒</span>
        <span className="cart-count" style={{ fontWeight: 600 }}>{totalItems}</span>
      </div>

      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>

              {/* Always render a formatted price */}
              <div className="cart-item-cost">${toNumberCost(item.cost).toFixed(2)}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Subtotal: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
        <h3>Grand Total: ${calculateTotalAmount()}</h3>
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
