// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, LogOut, User } from 'lucide-react';

const Header = ({ 
  onSearchChange, 
  searchQuery, 
  onJoinClick, 
  currentUser, 
  onLogout,
  onLogoClick,
  activeShopType,
  onShopTypeChange,
  onShopsClick,
  onOffersClick,
  onContactClick,
  onPageClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShopSelectOpen, setIsShopSelectOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setIsShopSelectOpen(false);
      setIsPagesDropdownOpen(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    onLogoClick();
  };

  return (
    <header className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      
      {/* Brand logo & Shop selector dropdown */}
      <div className="header-left">
        <a href="#" className="logo-container" onClick={handleLogoClick}>
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
        </a>

        {/* Grocery selection dropdown */}
        <div 
          className="grocery-select-container"
          onClick={(e) => {
            e.stopPropagation();
            setIsShopSelectOpen(!isShopSelectOpen);
            setIsPagesDropdownOpen(false);
          }}
        >
          <svg
            className="grocery-select-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
          </svg>
          <span>{activeShopType}</span>
          <ChevronDown size={14} style={{ transform: isShopSelectOpen ? 'rotate(180deg)' : 'none', transition: 'var(--transition-smooth)' }} />
          
          {isShopSelectOpen && (
            <div className="profile-dropdown" style={{ left: 0, right: 'auto', width: '150px' }}>
              {['Grocery', 'Bakery', 'Makeup', 'Books', 'Fashion'].map((shop) => (
                <div 
                  key={shop}
                  className="dropdown-item" 
                  style={{ 
                    color: activeShopType === shop ? 'var(--primary)' : 'inherit', 
                    fontWeight: activeShopType === shop ? '700' : 'normal' 
                  }}
                  onClick={() => onShopTypeChange(shop)}
                >
                  {shop}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Central inline search engine */}
      <div className="search-container">
        <div className="search-bar-wrap">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search your products from here..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInput}
          />
          <button className="search-btn" aria-label="Search button">Search</button>
        </div>
      </div>

      {/* Right navigation / CTAs */}
      <div className="header-right">
        <nav>
          <ul className="nav-links">
            <li className="nav-item" onClick={onShopsClick}>Shops</li>
            <li className="nav-item" onClick={onOffersClick}>Offers</li>
            <li className="nav-item" onClick={onContactClick}>Contact</li>
            <li 
              className="nav-item" 
              style={{ position: 'relative' }}
              onClick={(e) => {
                e.stopPropagation();
                setIsPagesDropdownOpen(!isPagesDropdownOpen);
                setIsShopSelectOpen(false);
              }}
            >
              Pages <ChevronDown size={12} />
              
              {isPagesDropdownOpen && (
                <div className="profile-dropdown" style={{ top: '100%', right: 0, width: '160px' }}>
                  <div 
                    className="dropdown-item" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onPageClick('about');
                      setIsPagesDropdownOpen(false);
                    }}
                  >
                    About Us
                  </div>
                  <div 
                    className="dropdown-item" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onPageClick('faq');
                      setIsPagesDropdownOpen(false);
                    }}
                  >
                    FAQ
                  </div>
                  <div 
                    className="dropdown-item" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onPageClick('terms');
                      setIsPagesDropdownOpen(false);
                    }}
                  >
                    Terms & Conditions
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Join button / Active Session avatar */}
        {currentUser ? (
          <div 
            className="user-profile-menu"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <div className="user-avatar">{currentUser.avatar}</div>
            <span className="user-name">{currentUser.name}</span>
            <ChevronDown size={14} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'var(--transition-smooth)' }} />

            {isDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-item" style={{ color: 'var(--text-main)', cursor: 'default' }}>
                  <User size={14} />
                  <span>Profile</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />
                <div className="dropdown-item" onClick={onLogout}>
                  <LogOut size={14} />
                  <span>Log out</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="btn-primary" onClick={onJoinClick}>
            Join
          </button>
        )}

        <button className="btn-outline" onClick={onContactClick}>Become a Seller</button>
      </div>

    </header>
  );
};

export default Header;
