import { Component } from 'preact';

import Header from '~/src/Components/Header';

import './App.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div>this is where the content will go</div>
        <div>this is where the footer will go</div>
      </div>
    );
  }
}
