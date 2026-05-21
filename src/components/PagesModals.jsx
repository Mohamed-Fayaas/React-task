import React, { useState } from 'react';
import { X, HelpCircle, Info, FileText, ChevronDown } from 'lucide-react';

const PagesModals = ({ isOpen, onClose, pageType }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How does the grocery delivery service work?',
      a: 'Simply browse organic products, add items to your cart, and click Proceed to Checkout. Once verified, our delivery partners will handpick the freshest products and deliver them to your doorstep in under 2 hours!'
    },
    {
      q: 'Are all your fruits and vegetables organic?',
      a: 'Yes! We collaborate directly with certified organic local farmers to ensure all produce is grown naturally without any toxic chemical fertilizers, pesticides, or GMOs.'
    },
    {
      q: 'What is your refund and return policy?',
      a: 'We offer an instant, hassle-free 100% money-back guarantee. If you are unsatisfied with the quality of any delivered product, simply report it via our Contact form within 24 hours of delivery, and we will issue a full refund!'
    },
    {
      q: 'Do you offer free shipping?',
      a: 'Absolutely! All orders exceeding a total of $15.00 qualify for immediate free shipping. For orders below $15.00, a nominal shipping charge of $3.50 is applied.'
    }
  ];

  const renderContent = () => {
    switch (pageType) {
      case 'faq':
        return (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <HelpCircle size={22} style={{ color: 'var(--primary)' }} />
                Frequently Asked Questions
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
                Quick solutions to common queries regarding grocery orders and deliveries.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx}
                    style={{
                      border: '1px solid var(--border-dark)',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: isOpen ? 'var(--primary-light)' : 'white',
                      overflow: 'hidden',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 20px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                      }}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown 
                        size={16} 
                        style={{ 
                          transform: isOpen ? 'rotate(180deg)' : 'none', 
                          transition: 'var(--transition-smooth)',
                          color: isOpen ? 'var(--primary)' : 'var(--text-light)'
                        }} 
                      />
                    </button>
                    {isOpen && (
                      <div 
                        style={{ 
                          padding: '0 20px 16px 20px', 
                          fontSize: '13px', 
                          color: 'var(--text-muted)', 
                          lineHeight: '1.5',
                          borderTop: '1px solid rgba(0, 158, 116, 0.1)',
                          paddingTop: '12px'
                        }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        );

      case 'about':
        return (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Info size={22} style={{ color: 'var(--primary)' }} />
                About PickBazar
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
                Learn about our origin, values, and organic delivery mission.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13.5px', lineHeight: '1.6', color: 'var(--text-muted)', textAlign: 'left' }}>
              <p>
                <strong>PickBazar</strong> was founded in 2020 with a simple yet powerful mission: to make organic, healthy, and high-quality groceries accessible and affordable for everyone.
              </p>
              
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginTop: '10px' }}>Our Core Pillars</h3>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>🌱 <strong>100% Organic Produce:</strong> Direct partnerships with local pesticide-free farms.</li>
                <li>⚡ <strong>Hyper-Local Shipping:</strong> 2-hour localized delivery models for fresh logistics.</li>
                <li>🤝 <strong>Hassle-Free Guarantees:</strong> Simple refunds to ensure peace of mind.</li>
              </ul>

              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginTop: '10px' }}>Company Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '2px solid var(--border-dark)', paddingLeft: '16px', marginLeft: '6px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)' }}>2020</div>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '13px' }}>Inception</div>
                  <div style={{ fontSize: '12px' }}>Launched in Silicon Valley, servicing local farm-to-table networks.</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)' }}>2022</div>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '13px' }}>Regional Expansion</div>
                  <div style={{ fontSize: '12px' }}>Expanded operations to cover 12 major metropolitan areas.</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)' }}>2025</div>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '13px' }}>Carbon-Neutral Logistics</div>
                  <div style={{ fontSize: '12px' }}>Introduced a fully electric vehicle fleet for eco-friendly shipping.</div>
                </div>
              </div>
            </div>
          </>
        );

      case 'terms':
        return (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <FileText size={22} style={{ color: 'var(--primary)' }} />
                Terms & Conditions
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
                Legal agreements and user guidelines of the PickBazar marketplace.
              </p>
            </div>

            <div 
              style={{ 
                maxHeight: '320px', 
                overflowY: 'auto', 
                padding: '16px', 
                border: '1px solid var(--border-dark)', 
                borderRadius: 'var(--radius-lg)', 
                fontSize: '12px', 
                color: 'var(--text-muted)', 
                lineHeight: '1.6', 
                textAlign: 'left',
                backgroundColor: 'white'
              }}
            >
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>1. Acceptance of Terms</h3>
              <p style={{ marginBottom: '12px' }}>
                By accessing and utilizing the PickBazar online marketplace, you declare your full acceptance of these Terms and Conditions. If you disagree, you must immediately terminate access.
              </p>
              
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>2. Account Registrations</h3>
              <p style={{ marginBottom: '12px' }}>
                Users are solely responsible for maintaining credentials security. Registered transactions are assumed authorized. PickBazar reserves the right to suspend accounts on security violations.
              </p>

              <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>3. Product Specifications & Prices</h3>
              <p style={{ marginBottom: '12px' }}>
                We attempt to display catalog items and prices as accurately as possible. However, weights are estimates, and products are subject to natural variations. Prices can change without prior warning.
              </p>

              <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>4. Shipping & Deliveries</h3>
              <p style={{ marginBottom: '12px' }}>
                We make best-effort commitments for our 2-hour shipment metrics. However, severe traffic or environmental hazards may delay shipments.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box" 
        style={{ maxWidth: '520px', padding: '30px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-icon" onClick={onClose} aria-label="Close modal page">
          <X size={20} />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default PagesModals;
