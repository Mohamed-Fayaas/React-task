// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { X, Mail, Lock, User, Check } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Input Validations
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (activeTab === 'register' && !name) {
      setError('Please enter your full name.');
      return;
    }

    // Simulate Network Request with beautiful spinner
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: activeTab === 'register' ? name : email.split('@')[0],
        email: email,
        avatar: (activeTab === 'register' ? name[0] : email[0]).toUpperCase(),
      };
      
      onLoginSuccess(user, activeTab === 'register' ? 'Account created successfully!' : 'Signed in successfully!');
      onClose();
      
      // Reset inputs
      setEmail('');
      setPassword('');
      setName('');
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Logo Section */}
        <div className="modal-logo-wrapper">
          <div className="modal-logo">
            <svg
              className="logo-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Pick<span className="logo-highlight">Bazar</span>
          </div>
          <p className="modal-subtitle">
            {activeTab === 'login' ? 'Login with your email & password' : 'Create a new account in seconds'}
          </p>
        </div>

        {/* Form Tab Switcher */}
        <div className="modal-tabs-header">
          <button
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('register');
              setError('');
            }}
          >
            Register
          </button>
        </div>

        {/* Error Messaging */}
        {error && (
          <div style={{ padding: '0 40px', marginBottom: '10px' }}>
            <div className="form-error-msg" style={{ backgroundColor: 'var(--accent-red-light)', padding: '10px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-red)' }}>
              {error}
            </div>
          </div>
        )}

        {/* Form Content */}
        <form className="modal-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <div className="form-group">
              <label className="form-label" htmlFor="register-name">Full Name</label>
              <div className="input-with-icon">
                <User className="form-field-icon" />
                <input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="modal-email">Email Address</label>
            <div className="input-with-icon">
              <Mail className="form-field-icon" />
              <input
                id="modal-email"
                type="email"
                placeholder="customer@demo.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="modal-password">Password</label>
            <div className="input-with-icon">
              <Lock className="form-field-icon" />
              <input
                id="modal-password"
                type="password"
                placeholder="••••••••"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {activeTab === 'login' && (
            <a href="#" className="forgot-password-link" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          )}

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : activeTab === 'login' ? (
              'Login'
            ) : (
              'Register'
            )}
          </button>

          <div className="divider-text">or</div>

          {/* Social Logins */}
          <div className="social-logins">
            <button
              type="button"
              className="btn-social"
              disabled={isLoading}
              onClick={() => {
                setEmail('demo.user@gmail.com');
                setPassword('password123');
                setName('Demo User');
                setError('Pre-filled demo login details! Click submit.');
              }}
            >
              {/* Google Premium Custom Logo */}
              <svg className="social-icon google" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.535 0-6.403-2.868-6.403-6.4s2.868-6.403 6.403-6.403c1.55 0 2.966.55 4.07 1.464l3.06-3.06c-1.89-1.748-4.38-2.818-7.13-2.818-6.075 0-11 4.925-11 11s4.925 11 11 11c5.83 0 10.74-4.14 10.74-11 0-.685-.06-1.35-.17-2.015H12.24z"/>
              </svg>
              Google Demo
            </button>
            <button
              type="button"
              className="btn-social"
              disabled={isLoading}
              onClick={() => {
                onLoginSuccess({
                  name: 'Fayaz',
                  email: 'fayaz@demo.com',
                  avatar: 'F',
                }, 'Demo Login successful!');
                onClose();
              }}
            >
              {/* Facebook Premium Custom Logo */}
              <svg className="social-icon facebook" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
              Quick Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
