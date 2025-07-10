import { Component, type ReactNode } from 'react';
import type { HeaderProps } from 'types/components.ts';
import Search from 'components/Search/Search.tsx';
import logo from 'assets/logo-pokemon.png';
import './Header.css';

export default class Header extends Component<HeaderProps> {
  render(): ReactNode {
    const { search, onSearchChange } = this.props;
    return (
      <header className="header-wrapper">
        <div className="header">
          <div className="header__image-wrapper">
            <img src={logo} alt="Logo" className="header__image" />
          </div>
          <Search search={search} onSearchChange={onSearchChange} />
        </div>
      </header>
    );
  }
}
