import { type FC } from 'react';
import logo from 'assets/logo-pokemon.png';
import './Header.css';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className="header-wrapper">
      <div className="header">
        <Link to="/" className="header__image-wrapper">
          <img src={logo} alt="Logo" className="header__image" />
        </Link>
        <nav className="header__nav">
          <Link className="header__nav-link" to="/">
            Main
          </Link>
          <Link className="header__nav-link" to="/about">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
