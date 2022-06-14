import { Component } from 'preact';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { getAuthResult } from '~/src/auth';
import Header from '~/src/Components/Header';
import Footer from '~/src/Components/Footer';

import { theme } from '~/src/theme';
import './App.scss';

export default class App extends Component {
  constructor() {
    super();

    getAuthResult();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme={true} />
        <div className="app">
          <Header />
          <div>This is where the main content will go</div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}
