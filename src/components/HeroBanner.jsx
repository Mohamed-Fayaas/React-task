// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const bannerThemes = {
  Grocery: {
    title: 'Groceries Delivered in 90 Minutes',
    subtitle: 'Get your daily needs delivered to your doorstep fresh and fast.',
    gradient: 'linear-gradient(135deg, #e6f6f2 0%, #ccefe5 100%)',
    accentColor: '#009e74',
    btnText: 'Shop Now',
    emoji: '🛒',
  },
  Bakery: {
    title: 'Freshly Baked Delights Daily',
    subtitle: 'Warm breads, pastries, and cakes baked fresh every morning.',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    accentColor: '#d97706',
    btnText: 'Order Now',
    emoji: '🥐',
  },
  Makeup: {
    title: 'Reveal Your Radiant Beauty',
    subtitle: 'Premium skincare and cosmetics delivered to your door.',
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    accentColor: '#db2777',
    btnText: 'Explore',
    emoji: '💄',
  },
  Books: {
    title: 'Discover Your Next Great Read',
    subtitle: 'Browse thousands of titles across every genre.',
    gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    accentColor: '#2563eb',
    btnText: 'Browse',
    emoji: '📚',
  },
  Fashion: {
    title: 'Trendy Seasonal Collection',
    subtitle: 'Latest styles and premium brands at your fingertips.',
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    accentColor: '#7c3aed',
    btnText: 'Shop Now',
    emoji: '👕',
  },
};

const HeroBanner = ({ onPromoAction, activeShopType }) => {
  const theme = bannerThemes[activeShopType] || bannerThemes.Grocery;

  return (
    <div
      style={{
        background: theme.gradient,
        borderRadius: 'var(--radius-lg)',
        padding: '48px 52px',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '32px',
        minHeight: '200px',
        transition: 'background 0.4s ease',
      }}
    >
      <div>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '800',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-main)',
            marginBottom: '10px',
            lineHeight: '1.2',
          }}
        >
          {theme.title}
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-muted)',
            marginBottom: '24px',
            maxWidth: '460px',
            lineHeight: '1.5',
          }}
        >
          {theme.subtitle}
        </p>
        <button
          className="btn-primary"
          onClick={onPromoAction}
          style={{
            backgroundColor: theme.accentColor,
            padding: '12px 28px',
            fontSize: '14px',
            fontWeight: '700',
            borderRadius: 'var(--radius-md)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <ShoppingBag size={16} />
          {theme.btnText}
        </button>
      </div>
      <div
        style={{
          fontSize: '80px',
          lineHeight: 1,
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        {theme.emoji}
      </div>
    </div>
  );
};

export default HeroBanner;
