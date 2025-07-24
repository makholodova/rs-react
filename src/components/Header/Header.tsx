import { type FC } from 'react';
import logo from 'assets/logo-pokemon.png';
import './Header.css';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className="header-wrapper">
      <div className="header">
        <div className="header__image-wrapper">
          <img src={logo} alt="Logo" className="header__image" />
        </div>
        <nav>
          <Link to="/">Main</Link> |<Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
