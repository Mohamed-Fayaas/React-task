import React, { useState } from 'react';
import { X, Tag, Copy, Check } from 'lucide-react';

const OffersModal = ({ isOpen, onClose, onApplyPromo, activePromoCode, triggerToast }) => {
  const [copiedCode, setCopiedCode] = useState(null);

  if (!isOpen) return null;

  const coupons = [
    {
      code: 'VEG20',
      discount: '20% OFF',
      title: 'Vegetables Special Discount',
      description: 'Get an instant 20% discount on all items in the Fruits & Vegetables category.',
      terms: 'Applicable for any order quantity.'
    },
    {
      code: 'FREE15',
      discount: 'FREE DELIVERY',
      title: 'Free Shipping Voucher',
      description: 'Waive the entire delivery fee on orders of any size.',
      terms: 'Applies automatically to shipping charges.'
    },
    {
      code: 'WELCOME10',
      discount: '10% OFF',
      title: 'Welcome First Order Offer',
      description: 'Save 10% on your entire cart subtotal.',
      terms: 'Applicable for registered users.'
    }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    triggerToast(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleApplyPromo = (code) => {
    onApplyPromo(code);
    triggerToast(`Coupon code ${code} applied successfully!`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box" 
        style={{ maxWidth: '540px', padding: '30px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-icon" onClick={onClose} aria-label="Close offers">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Tag size={24} style={{ color: 'var(--primary)' }} />
            Special Deals & Coupons
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
            Copy or apply vouchers below to enjoy instant savings at checkout.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {coupons.map((coupon) => {
            const isApplied = activePromoCode === coupon.code;
            return (
              <div
                key={coupon.code}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  border: isApplied ? '2px solid var(--primary)' : '1px dashed var(--border-dark)',
                  backgroundColor: isApplied ? 'var(--primary-light)' : 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {/* Applied Ribbon Indicator */}
                {isApplied && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: '800',
                      padding: '4px 12px',
                      borderRadius: '0 0 0 var(--radius-md)'
                    }}
                  >
                    APPLIED
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <span 
                      style={{ 
                        display: 'inline-block',
                        backgroundColor: isApplied ? 'white' : 'var(--primary-light)',
                        color: 'var(--primary)',
                        fontWeight: '800',
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        marginBottom: '6px'
                      }}
                    >
                      {coupon.discount}
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>
                      {coupon.title}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="icon-button"
                      style={{ border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-md)', padding: '6px' }}
                      onClick={() => handleCopyCode(coupon.code)}
                      title="Copy coupon code"
                    >
                      {copiedCode === coupon.code ? <Check size={14} style={{ color: 'var(--primary)' }} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', textAlign: 'left', lineHeight: '1.4' }}>
                  {coupon.description}
                </p>

                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    paddingTop: '10px',
                    borderTop: '1px dashed var(--border-color)',
                    fontSize: '11px',
                    color: 'var(--text-light)'
                  }}
                >
                  <span>* {coupon.terms}</span>
                  <button
                    className="btn-primary"
                    style={{ 
                      padding: '6px 14px', 
                      fontSize: '12px',
                      backgroundColor: isApplied ? 'transparent' : 'var(--primary)',
                      border: isApplied ? '1px solid var(--primary)' : 'none',
                      color: isApplied ? 'var(--primary)' : 'white',
                      boxShadow: 'none'
                    }}
                    onClick={() => handleApplyPromo(coupon.code)}
                    disabled={isApplied}
                  >
                    {isApplied ? 'Applied' : 'Apply Coupon'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OffersModal;
