import { Component } from 'preact';

import Header from '~/src/Components/Header';
import Footer from '~/src/Components/Footer';

import './App.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div>this is where the content will go</div>
        <Footer />
      </div>
    );
  }
}
