import React from 'react';
import { ShoppingBag, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, cartItem, onAddToCart, onUpdateCart }) => {
  const { name, unit, price, originalPrice, discount, image } = product;

  const handleAdd = () => {
    onAddToCart(product);
  };

  const handleIncrement = () => {
    onUpdateCart(product, cartItem.quantity + 1);
  };

  const handleDecrement = () => {
    if (cartItem.quantity > 1) {
      onUpdateCart(product, cartItem.quantity - 1);
    } else {
      onUpdateCart(product, 0); // remove item if quantity drops below 1
    }
  };

  return (
    <div className="product-card">
      {/* Discount Badge */}
      {discount && <div className="badge-discount">{discount}% OFF</div>}

      {/* Product Image */}
      <div className="product-img-wrapper">
        <img 
          src={image} 
          alt={name} 
          className="product-image" 
          loading="lazy" 
        />
      </div>

      {/* Product Details */}
      <div className="product-info">
        <div className="product-unit">{unit}</div>
        <h3 className="product-title" title={name}>{name}</h3>
      </div>

      {/* Prices & Interactive Button */}
      <div className="product-price-row">
        <div className="prices-container">
          {originalPrice && (
            <span className="price-original">${originalPrice.toFixed(2)}</span>
          )}
          <span className="price-current">${price.toFixed(2)}</span>
        </div>

        <div className="cart-action-container">
          {cartItem ? (
            /* Custom springy stepper when added to cart */
            <div className="cart-stepper">
              <button 
                className="stepper-btn" 
                onClick={handleDecrement}
                aria-label={`Decrease quantity of ${name}`}
              >
                <Minus className="stepper-icon" />
              </button>
              <span className="stepper-val">{cartItem.quantity}</span>
              <button 
                className="stepper-btn" 
                onClick={handleIncrement}
                aria-label={`Increase quantity of ${name}`}
              >
                <Plus className="stepper-icon" />
              </button>
            </div>
          ) : (
            /* Standard cart action button */
            <button className="btn-add-cart" onClick={handleAdd}>
              <ShoppingBag className="cart-icon-sm" />
              <span>Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
