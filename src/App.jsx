import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import Toast from './components/Toast';

// New interactive navbar components
import ShopsModal from './components/ShopsModal';
import OffersModal from './components/OffersModal';
import ContactDrawer from './components/ContactDrawer';
import PagesModals from './components/PagesModals';

// Hero Banner Component
import HeroBanner from './components/HeroBanner';

import { products, categories } from './data/products';
import { ShoppingBag } from 'lucide-react';

function App() {
  // Application State
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [toast, setToast] = useState(null);

  // New states for navbar buttons
  const [activeShopType, setActiveShopType] = useState('Grocery');
  const [isShopsOpen, setIsShopsOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [pagesType, setPagesType] = useState('faq'); // 'faq', 'about', 'terms'
  const [activePromoCode, setActivePromoCode] = useState(null);

  // Trigger non-intrusive notifications
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Cart Operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    triggerToast(`Added ${product.name} to cart!`);
  };

  const handleUpdateCart = (product, quantity) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        triggerToast(`Removed ${product.name} from cart.`);
        return prevCart.filter((item) => item.id !== product.id);
      }
      return prevCart.map((item) => 
        item.id === product.id ? { ...item, quantity: quantity } : item
      );
    });
  };

  const handleCheckout = () => {
    if (!currentUser) {
      setIsCartOpen(false);
      setIsLoginOpen(true);
      triggerToast('Please join or login before checking out!', 'error');
      return;
    }

    triggerToast('Order placed successfully! Mock checkout complete.', 'success');
    setCart([]);
    setActivePromoCode(null); // clear coupon
    setIsCartOpen(false);
  };

  // Session Toggles
  const handleLoginSuccess = (user, message) => {
    setCurrentUser(user);
    triggerToast(message, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    triggerToast('Signed out successfully.');
  };

  const handleResetFilters = () => {
    setActiveCategory(null);
    setSearchQuery('');
  };

  const handleShopTypeChange = (shop) => {
    setActiveShopType(shop);
    setActiveCategory(null); // reset category filter
    setSearchQuery(''); // reset search query
    triggerToast(`Switched to the ${shop} Shop!`);
  };

  // Dynamic promo discounts calculations
  const promoDiscountAmount = activePromoCode === 'VEG20'
    ? cart.reduce((sum, item) => item.category === 'Fruits & Vegetables' ? sum + (item.price * item.quantity * 0.20) : sum, 0)
    : activePromoCode === 'WELCOME10'
    ? cart.reduce((sum, item) => sum + (item.price * item.quantity * 0.10), 0)
    : 0;

  // Real-time filtering engine
  const filteredProducts = products.filter((product) => {
    // Match Shop Type
    let matchesShop = true;
    if (activeShopType === 'Bakery') {
      matchesShop = product.category === 'Snacks' || product.category === 'Dairy';
    } else if (activeShopType === 'Makeup') {
      matchesShop = product.category === 'Health & Beauty';
    } else if (activeShopType === 'Books' || activeShopType === 'Fashion') {
      matchesShop = false; // will trigger the Empty State beautifully!
    } else {
      // Grocery includes all other categories by default
      matchesShop = product.category !== 'Health & Beauty';
    }

    const matchesCategory = activeCategory ? product.category === activeCategory : true;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesShop && matchesCategory && matchesSearch;
  });

  // Category listing should dynamically filter based on activeShopType too
  const filteredCategories = categories.filter((category) => {
    if (activeShopType === 'Bakery') {
      return category.name === 'Snacks' || category.name === 'Dairy';
    } else if (activeShopType === 'Makeup') {
      return category.name === 'Health & Beauty';
    } else if (activeShopType === 'Books' || activeShopType === 'Fashion') {
      return false;
    }
    // Grocery includes everything else
    return category.name !== 'Health & Beauty';
  });

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate floating widget price considering discount
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTax = Math.max(0, (cartSubtotal - promoDiscountAmount) * 0.05);
  const cartShipping = activePromoCode === 'FREE15' ? 0 : (cartSubtotal > 15 ? 0 : cartSubtotal > 0 ? 3.50 : 0);
  const cartTotalPrice = Math.max(0, cartSubtotal - promoDiscountAmount + cartTax + cartShipping);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onJoinClick={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLogoClick={handleResetFilters}
        activeShopType={activeShopType}
        onShopTypeChange={handleShopTypeChange}
        onShopsClick={() => setIsShopsOpen(true)}
        onOffersClick={() => setIsOffersOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
        onPageClick={(type) => {
          setPagesType(type);
          setIsPagesOpen(true);
        }}
      />

      {/* Main Page Layout */}
      <div className="main-content">
        {/* Sidebar category filter */}
        <Sidebar
          categories={filteredCategories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Product Cards Grid section */}
        <main className="products-layout-wrapper">
          {/* Beautiful Hero Banner section integrated seamlessly */}
          <HeroBanner
            activeShopType={activeShopType}
            onPromoAction={() => setIsOffersOpen(true)}
          />

          {filteredProducts.length === 0 ? (
            <div className="empty-products">
              <svg
                className="empty-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15h8" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
              </svg>
              <h2 className="empty-title">No Products Found</h2>
              <p className="empty-desc">
                {activeShopType === 'Books' || activeShopType === 'Fashion' 
                  ? `Our ${activeShopType} inventory is currently being stocked. Check back soon!`
                  : "We couldn't find anything matching your search. Try resetting filters to see everything!"}
              </p>
              {(activeShopType === 'Books' || activeShopType === 'Fashion') ? (
                <button 
                  className="btn-primary" 
                  style={{ marginTop: '20px' }}
                  onClick={() => handleShopTypeChange('Grocery')}
                >
                  Return to Grocery Store
                </button>
              ) : (
                <button 
                  className="btn-primary" 
                  style={{ marginTop: '20px' }}
                  onClick={handleResetFilters}
                >
                  Clear Search & Filters
                </button>
              )}
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const cartItem = cart.find((item) => item.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cartItem={cartItem}
                    onAddToCart={handleAddToCart}
                    onUpdateCart={handleUpdateCart}
                  />
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Sticky Floating Cart Trigger Widget */}
      {cartTotalItems > 0 && (
        <div 
          className="floating-cart-widget"
          onClick={() => setIsCartOpen(true)}
        >
          <div className="widget-icon-row">
            <ShoppingBag className="widget-icon" />
            <span>{cartTotalItems} {cartTotalItems === 1 ? 'Item' : 'Items'}</span>
          </div>
          <div className="widget-price-tag">
            ${cartTotalPrice.toFixed(2)}
          </div>
        </div>
      )}

      {/* Slide-out Cart Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateCart={handleUpdateCart}
        onCheckout={handleCheckout}
        activePromoCode={activePromoCode}
        promoDiscountAmount={promoDiscountAmount}
      />

      {/* Glassmorphic Login/Register Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Specialty Nav Modals / Drawers */}
      <ShopsModal
        isOpen={isShopsOpen}
        onClose={() => setIsShopsOpen(false)}
        onSelectShop={handleShopTypeChange}
      />

      <OffersModal
        isOpen={isOffersOpen}
        onClose={() => setIsOffersOpen(false)}
        onApplyPromo={setActivePromoCode}
        activePromoCode={activePromoCode}
        triggerToast={triggerToast}
      />

      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        triggerToast={triggerToast}
      />

      <PagesModals
        isOpen={isPagesOpen}
        onClose={() => setIsPagesOpen(false)}
        pageType={pagesType}
      />

      {/* Toast Notification System */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
