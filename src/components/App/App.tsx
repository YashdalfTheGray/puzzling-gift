import { Component } from 'preact';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { getAuthResult } from '~/src/auth';
import Header from '~/src/components/Header';
import Footer from '~/src/components/Footer';

import { theme } from '~/src/theme';
import './App.scss';
import { UserCredential } from 'firebase/auth';

export type AppState = {
  authResult: UserCredential | null | undefined;
};

export default class App extends Component<{}, AppState> {
  constructor() {
    super();

    this.state = {
      authResult: null,
    };
  }

  async componentDidMount() {
    const authResult = await getAuthResult();
    this.setState({ authResult });
  }

  render() {
    const { authResult } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme={true} />
        <div className="app">
          <Header authResult={authResult} />
          <div>This is where the main content will go</div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}
