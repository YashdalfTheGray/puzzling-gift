// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { doAuthRedirect } from '~/src/auth';

export type AccountButtonProps = {
  isAuthenticated: boolean;
  profilePictureUrl: string;
  userName: string;
};

export type AccountButtonState = {
  menuAnchorElement: HTMLElement | null;
};

export default class AccountButton extends Component<
  AccountButtonProps,
  AccountButtonState
> {
  constructor(props: AccountButtonProps) {
    super(props);

    this.state = {
      menuAnchorElement: null,
    };
  }

  public handleMenuOpen = (event: MouseEvent) => {
    this.setState({ menuAnchorElement: event.currentTarget as HTMLElement });
  };

  public handleMenuClose = () => {
    this.setState({ menuAnchorElement: null });
  };

  render() {
    const { menuAnchorElement } = this.state;
    const { isAuthenticated, profilePictureUrl, userName } = this.props;

    return isAuthenticated ? (
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={this.handleMenuOpen}
          color="inherit">
          <Avatar alt={userName} src={profilePictureUrl} />
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
          <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
        </Menu>
      </div>
    ) : (
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={doAuthRedirect}
        color="inherit">
        <AccountCircle />
      </IconButton>
    );
  }
}
