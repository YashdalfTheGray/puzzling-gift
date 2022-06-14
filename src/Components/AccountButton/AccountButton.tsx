import { Component } from 'preact';

import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { doAuthRedirect } from '~/src/auth';

export type AccountButtonProps = {
  isAuthenticated: boolean;
  profilePictureUrl: string;
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

  public handleMenuClose = (event: MouseEvent) => {
    this.setState({ menuAnchorElement: null });
  };

  render() {
    const { menuAnchorElement } = this.state;

    return (
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={this.handleMenuOpen}
          color="inherit">
          <AccountCircle />
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
    );
  }
}
