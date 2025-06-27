import './Header.css';
import { Component } from 'react';
import logo from 'assets/logo-pokemon.png';
import Search from 'components/Search/Search.tsx';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default class Header extends Component<Props> {
  render() {
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
