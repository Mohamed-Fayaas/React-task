// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateCart, 
  onCheckout,
  activePromoCode,
  promoDiscountAmount = 0
}) => {
  if (!isOpen) return null;

  // Calculates sums
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.max(0, (subtotal - promoDiscountAmount) * 0.05); // 5% mock tax
  const shipping = activePromoCode === 'FREE15' ? 0 : (subtotal > 15 ? 0 : subtotal > 0 ? 3.50 : 0); // free shipping if FREE15 or subtotal > 15
  const grandTotal = Math.max(0, subtotal - promoDiscountAmount + tax + shipping);

  const handleIncrement = (item) => {
    onUpdateCart(item, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      onUpdateCart(item, item.quantity - 1);
    } else {
      onUpdateCart(item, 0); // remove if quantity drops below 1
    }
  };

  const handleRemove = (item) => {
    onUpdateCart(item, 0);
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="cart-drawer-container">
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <ShoppingBag size={22} />
            <h3>{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <svg
                className="empty-cart-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <h4>Your Cart is Empty</h4>
              <p className="empty-cart-txt">Start adding delicious groceries to your basket.</p>
              <button 
                className="btn-primary" 
                style={{ marginTop: '20px', padding: '10px 24px' }}
                onClick={onClose}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Stepper on left */}
                <div className="cart-item-stepper">
                  <button 
                    className="cart-item-stepper-btn" 
                    onClick={() => handleIncrement(item)}
                    aria-label="Add one more"
                  >
                    <Plus size={12} />
                  </button>
                  <span className="cart-item-val">{item.quantity}</span>
                  <button 
                    className="cart-item-stepper-btn" 
                    onClick={() => handleDecrement(item)}
                    aria-label="Remove one"
                  >
                    <Minus size={12} />
                  </button>
                </div>

                {/* Product Thumbnail */}
                <img src={item.image} alt={item.name} className="cart-item-img" />

                {/* Details */}
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <div className="cart-item-price-calc">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </div>
                </div>

                {/* Total Item Price & Remove */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="cart-item-total-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button 
                    className="btn-remove-item" 
                    onClick={() => handleRemove(item)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="checkout-details-table">
              <div className="details-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {promoDiscountAmount > 0 && (
                <div className="details-row" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                  <span>Discount ({activePromoCode})</span>
                  <span>-${promoDiscountAmount.toFixed(2)}</span>
                </div>
              )}
              {activePromoCode === 'FREE15' && (
                <div className="details-row" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                  <span>Shipping Promo ({activePromoCode})</span>
                  <span>FREE</span>
                </div>
              )}
              <div className="details-row">
                <span>GST / Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="details-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="details-row grand-total">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn-checkout" onClick={onCheckout}>
              <span>Proceed to Checkout</span>
              <span className="btn-checkout-price">
                ${grandTotal.toFixed(2)}
                <ArrowRight size={14} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
