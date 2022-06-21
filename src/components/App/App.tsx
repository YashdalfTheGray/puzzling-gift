// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/src/theme';
import Header from '~/src/components/Header';
import Footer from '~/src/components/Footer';
import MainContent from '~/src/components/MainContent';
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
  dispatchLoginResult: PuzzleActions.loginResult,
};

export type AppProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      authResult: null,
    };
  }

  async componentDidMount() {
    const { dispatchLoginResult } = this.props;

    dispatchLoginResult();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline enableColorScheme={true} />
          <div className="app">
            <Header />
            <MainContent />
            <Footer />
          </div>
        </>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
