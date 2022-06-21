// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';
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

export interface IMainContentProps {
  puzzleId: string;
}

export type MainContentProps = IMainContentProps &
  ReturnType<typeof mapStateToProps>;

export class MainContent extends Component<MainContentProps> {
  render() {
    const { isUserLoggedIn, isProcessingLogin, isProcessingLogout, puzzleId } =
      this.props;

    if (isProcessingLogin || isProcessingLogout) {
      return (
        <div className="MainContent loading">
          <CircularProgress sx={{ color: 'primary' }} thickness={5} />
        </div>
      );
    } else if (!isProcessingLogin && !isProcessingLogout && !isUserLoggedIn) {
      return (
        <div className="MainContent logged-out">
          To access the puzzle, use the login button above.
        </div>
      );
    } else if (!isProcessingLogin && !isProcessingLogout && isUserLoggedIn) {
      return <div>Trying to fetch {puzzleId} from firebase.</div>;
    }
  }
}

export default connect(mapStateToProps)(MainContent);
