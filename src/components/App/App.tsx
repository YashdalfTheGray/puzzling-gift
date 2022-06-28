// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component, StrictMode } from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/src/theme';
import { UUID } from '~/src/datastoreTypes';
import Header from '~/src/components/Header';
import Footer from '~/src/components/Footer';
import MainContent from '~/src/components/MainContent';
import { PuzzleStore, ActionSliceNames } from '~/src/redux/puzzleStore';
import * as puzzleSelectors from '~/src/redux/selectors';
import { PuzzleActions } from '~/src/redux/actions';

import './App.scss';
import ErrorBoundary from '~/src/components/ErrorBoundary';

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

export type AppState = {
  puzzleId: UUID;
};

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      puzzleId: '',
    };
  }

  public getPuzzleIdFromUrl() {
    const searchParamsString = window.location.search;
    const params = new URLSearchParams(searchParamsString);
    return params.get('puzzleId')!;
  }

  async componentDidMount() {
    const { dispatchLoginResult } = this.props;

    dispatchLoginResult();

    this.setState({
      puzzleId: this.getPuzzleIdFromUrl(),
    });
  }

  render() {
    const { puzzleId } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <StrictMode>
          <CssBaseline enableColorScheme={true} />
          <ErrorBoundary>
            <div className="app">
              <Header renderAccountButton={!!puzzleId} />
              <MainContent puzzleId={puzzleId} />
              <Footer />
            </div>
          </ErrorBoundary>
        </StrictMode>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
