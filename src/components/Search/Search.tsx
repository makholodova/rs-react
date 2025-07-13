import {
  type ChangeEvent,
  Component,
  type FormEvent,
  type ReactNode,
} from 'react';
import type { SearchProps, SearchState } from 'types/components.ts';
import BaseInput from 'components/ui/BaseInput/BaseInput.tsx';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import './Search.css';

export default class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    search: this.props.search || '',
  };

  componentDidUpdate(prevProps: SearchProps): void {
    if (prevProps.search !== this.props.search) {
      this.setState({ search: this.props.search });
    }
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: e.target.value });
    const value = e.target.value;
    this.setState({ search: value });
    localStorage.setItem('search-makholodova', JSON.stringify(value.trim()));
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.onSearchChange(this.state.search.trim());
  };

  render(): ReactNode {
    const { search } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="search-container">
        <BaseInput
          type="search"
          placeholder="Search..."
          value={search}
          onChange={this.handleInput}
        />
        <BaseButton className="header-button" type="submit">
          Search
        </BaseButton>
      </form>
    );
  }
}
