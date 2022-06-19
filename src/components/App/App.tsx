// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';
import { UserCredential } from 'firebase/auth';
import { connect } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { getAuthResult } from '~/src/auth';
import { theme } from '~/src/theme';
import Header from '~/src/components/Header';
import Footer from '~/src/components/Footer';
import { PuzzleStore, ActionSliceNames } from '~/src/redux/puzzleStore';
import * as puzzleSelectors from '~/src/redux/Selectors';
import { PuzzleActions } from '~/src/redux/actions';

import './App.scss';

const mapStateToProps = (state: PuzzleStore) => ({
  currentUser: puzzleSelectors.getCurrentUser(state),
  isUserLoggedIn: puzzleSelectors.isUserLoggedIn(state),
  isProcessingLogin: puzzleSelectors.getIsProcessingByAction(
    state,
    ActionSliceNames.LoginResult
  ),
});

const mapDispatchToProps = {
  getAuthResult: PuzzleActions.loginResult,
};

export type AppState = {
  authResult: UserCredential | null | undefined;
};

export type AppProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      authResult: null,
    };
  }

  async componentDidMount() {
    const { getAuthResult } = this.props;

    // getAuthResult();
  }

  render() {
    const { authResult } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline enableColorScheme={true} />
          <div className="app">
            <Header authResult={authResult} />
            <div>This is where the main content will go</div>
            <Footer />
          </div>
        </>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
