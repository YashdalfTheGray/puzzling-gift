// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';

import { PuzzleStore, ActionSliceNames } from '~/src/redux/puzzleStore';
import * as puzzleSelectors from '~/src/redux/selectors';

import './MainContent.scss';

const mapStateToProps = (state: PuzzleStore) => ({
  isUserLoggedIn: puzzleSelectors.isUserLoggedIn(state),
  isProcessingLogin: puzzleSelectors.getIsProcessingByAction(
    state,
    ActionSliceNames.LoginResult
  ),
  isProcessingLogout: puzzleSelectors.getIsProcessingByAction(
    state,
    ActionSliceNames.Logout
  ),
});

export type MainContentProps = ReturnType<typeof mapStateToProps>;

export class MainContent extends Component<MainContentProps> {
  render() {
    const { isUserLoggedIn, isProcessingLogin, isProcessingLogout } =
      this.props;

    if (isProcessingLogin || isProcessingLogout) {
      return (
        <div className="MainContent loading">
          <CircularProgress sx={{ color: 'primary' }} thickness={5} />
        </div>
      );
    } else if (!isProcessingLogin && !isProcessingLogout && !isUserLoggedIn) {
      return <div>This is where the logged out content will go</div>;
    } else if (!isProcessingLogin && !isProcessingLogout && isUserLoggedIn) {
      return <div>This is where the logged in content will go</div>;
    }
  }
}

export default connect(mapStateToProps)(MainContent);
