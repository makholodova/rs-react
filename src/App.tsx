import { Component } from 'react';
import './App.css';
import Header from 'components/Header/Header.tsx';
import Main from 'components/Main/Main.tsx';

type State = {
  search: string;
};
export default class App extends Component {
  state: State = {
    search: '',
  };

  handleSearchChange = (value: string) => {
    this.setState({ search: value });
  };

  render() {
    const { search } = this.state;
    return (
      <div className="App">
        <Header search={search} onSearchChange={this.handleSearchChange} />
        <Main search={search} />
      </div>
    );
  }
}
