import React from 'react';
import { X, ShoppingBag, Carrot, Cake, Sparkles, BookOpen, Shirt } from 'lucide-react';

const ShopsModal = ({ isOpen, onClose, onSelectShop }) => {
  if (!isOpen) return null;

  const shopTypes = [
    {
      id: 'Grocery',
      title: 'Grocery Store',
      desc: 'Fresh organic fruits, green vegetables, premium dairy, daily essentials.',
      icon: Carrot,
      color: '#009e74',
      bgLight: '#e6f6f2'
    },
    {
      id: 'Bakery',
      title: 'Bakery & Sweets',
      desc: 'Freshly baked breads, pastries, custom chocolate cakes, and cookies.',
      icon: Cake,
      color: '#d97706',
      bgLight: '#fffbeb'
    },
    {
      id: 'Makeup',
      title: 'Makeup & Cosmetics',
      desc: 'Luxury skincare, makeup kits, essential oils, and health items.',
      icon: Sparkles,
      color: '#db2777',
      bgLight: '#fdf2f8'
    },
    {
      id: 'Books',
      title: 'Book Store',
      desc: 'Educational textbooks, classic novels, children stories, science fiction.',
      icon: BookOpen,
      color: '#2563eb',
      bgLight: '#eff6ff'
    },
    {
      id: 'Fashion',
      title: 'Fashion & Clothes',
      desc: 'Trendy summer clothes, sneakers, jackets, and stylish accessories.',
      icon: Shirt,
      color: '#7c3aed',
      bgLight: '#f5f3ff'
    }
  ];

  const handleShopSelect = (shopId) => {
    onSelectShop(shopId);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box" 
        style={{ maxWidth: '640px', padding: '30px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-icon" onClick={onClose} aria-label="Close shops list">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Our Specialized Shops</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
            Choose a shop segment to browse tailored premium items.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
          {shopTypes.map((shop) => {
            const Icon = shop.icon;
            return (
              <div
                key={shop.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-dark)',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                }}
                className="category-item" // borrow hover classes
                onClick={() => handleShopSelect(shop.id)}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: shop.bgLight,
                    color: shop.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={24} />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
                    {shop.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {shop.desc}
                  </p>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ 
                    backgroundColor: shop.color, 
                    padding: '8px 16px',
                    fontSize: '12px',
                    boxShadow: 'none'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShopSelect(shop.id);
                  }}
                >
                  Enter
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopsModal;
