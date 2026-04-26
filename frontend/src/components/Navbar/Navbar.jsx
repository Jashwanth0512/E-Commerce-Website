import React, { useState, useContext } from 'react';
import './Navbar.css';
import logo from '../Asserts/logo.png';
import cart_icon from '../Asserts/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../Asserts/nav_dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  }

  // Toggle menu function
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking a menu item
  const handleMenuItemClick = (menuItem) => {
    setMenu(menuItem);
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>SHOPPER</p>
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="nav-dropdown-container"
        onClick={handleMenuToggle}
      >
        <img 
          src={nav_dropdown} 
          alt="menu" 
          className={`nav-dropdown ${isMenuOpen ? 'open' : ''}`}
        />
      </button>

      {/* Navigation menu */}
      <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-visible' : ''}`}>
        <li onClick={() => handleMenuItemClick("shop")}>
          <Link style={{textDecoration: 'none'}} to="/">Shop</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => handleMenuItemClick("mens")}>
          <Link style={{textDecoration: 'none'}} to="/mens">Men</Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li onClick={() => handleMenuItemClick("womens")}>
          <Link style={{textDecoration: 'none'}} to="/womens">Women</Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li onClick={() => handleMenuItemClick("kids")}>
          <Link style={{textDecoration: 'none'}} to="/kids">Kids</Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {user ? (
          <div className="user-info">
            <span>Welcome, {user.name || user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="Cart Icon" />
          {getTotalCartItems() > 0 && <div className="nav-cart-count">{getTotalCartItems()}</div>}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
