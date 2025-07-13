import { Component, type ReactNode } from 'react';
import './App.css';
import Header from 'components/Header/Header.tsx';
import Main from 'components/Main/Main.tsx';
import type { AppState } from 'types/components.ts';

export default class App extends Component {
  state: AppState = {
    search: '',
    isSearchReady: false,
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('search-makholodova');
    const parsedSearch = savedSearch ? JSON.parse(savedSearch) : '';
    this.setState({ search: parsedSearch, isSearchReady: true });
  }
  handleSearchChange = (value: string): void => {
    localStorage.setItem('search-makholodova', JSON.stringify(value));
    this.setState({ search: value });
  };

  render(): ReactNode {
    const { search, isSearchReady } = this.state;
    return (
      <div className="App">
        <Header search={search} onSearchChange={this.handleSearchChange} />
        {isSearchReady && <Main search={search} />}
      </div>
    );
  }
}
