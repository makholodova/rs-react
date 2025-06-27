import './Search.css';
import { type ChangeEvent, Component, type FormEvent } from 'react';
import BaseInput from 'components/ui/BaseInput/BaseInput.tsx';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}
interface State {
  inputValue: string;
}

export default class Search extends Component<Props, State> {
  state: State = {
    inputValue: this.props.search || '',
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.search !== this.props.search) {
      this.setState({ inputValue: this.props.search });
    }
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSearchChange(this.state.inputValue.trim());
  };

  render() {
    const { inputValue } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="search-container">
        <BaseInput
          type="search"
          placeholder="Search..."
          value={inputValue}
          onChange={this.handleInput}
        />
        <BaseButton className="header-button" type="submit">
          Search
        </BaseButton>
      </form>
    );
  }
}
