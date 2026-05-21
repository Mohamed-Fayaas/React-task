// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactDrawer = ({ isOpen, onClose, triggerToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Validations
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!subject.trim()) newErrors.subject = 'Subject is required.';
    if (!message.trim()) newErrors.message = 'Message is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate feedback sending
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      triggerToast('Message sent successfully! We will get back to you shortly.');
      
      // Reset inputs & close
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      onClose();
    }, 1200);
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="cart-drawer-container" style={{ width: '450px' }}>
        {/* Drawer Header */}
        <div className="drawer-header" style={{ paddingBottom: '20px' }}>
          <div className="drawer-title-row" style={{ color: 'var(--text-main)' }}>
            <Mail size={22} style={{ color: 'var(--primary)' }} />
            <h3>Contact Support</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close contact drawer">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body" style={{ gap: '20px' }}>
          {/* Quick contact details cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '13px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                <Phone size={14} />
              </div>
              <span style={{ fontWeight: '600' }}>+1 (555) 019-2834</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '13px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                <MapPin size={14} />
              </div>
              <span style={{ color: 'var(--text-muted)' }}>786 Bengaluru road, CA</span>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Name Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                className="form-input"
                style={{ paddingLeft: '16px' }}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSending}
              />
              {errors.name && <span className="form-error-msg">{errors.name}</span>}
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                className="form-input"
                style={{ paddingLeft: '16px' }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSending}
              />
              {errors.email && <span className="form-error-msg">{errors.email}</span>}
            </div>

            {/* Subject Input */}
            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                className="form-input"
                style={{ paddingLeft: '16px' }}
                placeholder="Product Inquiry / Delivery Issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSending}
              />
              {errors.subject && <span className="form-error-msg">{errors.subject}</span>}
            </div>

            {/* Message Area */}
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message Details</label>
              <textarea
                id="contact-message"
                className="form-input"
                style={{ paddingLeft: '16px', minHeight: '120px', resize: 'vertical' }}
                placeholder="How can we help you today?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSending}
              />
              {errors.message && <span className="form-error-msg">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className="btn-submit" 
              style={{ marginTop: '10px' }}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} style={{ marginRight: '6px' }} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactDrawer;
