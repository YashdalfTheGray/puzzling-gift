// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';

import { PuzzleActions } from '~/src/redux/actions';
import { PuzzleStore, ActionSliceNames } from '~/src/redux/puzzleStore';
import * as puzzleSelectors from '~/src/redux/selectors';

const mapStateToProps = (state: PuzzleStore) => ({
  currentUser: puzzleSelectors.getCurrentUser(state),
  isUserLoggedIn: puzzleSelectors.isUserLoggedIn(state),
  isProcessingLogin: puzzleSelectors.getIsProcessingByAction(
    state,
    ActionSliceNames.LoginResult
  ),
});

const mapDispatchToProps = {
  dispatchLoginStart: PuzzleActions.loginStart,
  dispatchLogout: PuzzleActions.logout,
};

type AccountButtonProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export type AccountButtonState = {
  menuAnchorElement: HTMLElement | null;
};

export class AccountButton extends Component<
  AccountButtonProps,
  AccountButtonState
> {
  constructor(props: AccountButtonProps) {
    super(props);

    this.state = {
      menuAnchorElement: null,
    };
  }

  public handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    this.setState({ menuAnchorElement: event.currentTarget as HTMLElement });
  };

  public handleMenuClose = () => {
    this.setState({ menuAnchorElement: null });
  };

  render() {
    const { menuAnchorElement } = this.state;
    const {
      dispatchLoginStart,
      dispatchLogout,
      currentUser,
      isProcessingLogin,
    } = this.props;

    if (!isProcessingLogin && !currentUser) {
      return (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={dispatchLoginStart}
          color="inherit">
          <AccountCircle />
        </IconButton>
      );
    } else if (isProcessingLogin) {
      return (
        <LoadingButton
          disabled={true}
          loading={true}
          loadingIndicator={
            <CircularProgress
              sx={{ color: 'background.paper' }}
              thickness={5}
              size={16}
            />
          }
        />
      );
    } else if (!isProcessingLogin && currentUser) {
      return (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleMenuOpen}
            color="inherit">
            <Avatar
              alt={currentUser.user.displayName!}
              src={currentUser.user.photoURL!}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={menuAnchorElement}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(menuAnchorElement)}
            onClose={this.handleMenuClose}>
            <MenuItem onClick={dispatchLogout}>Logout</MenuItem>
          </Menu>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountButton);
