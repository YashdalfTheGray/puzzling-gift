import { Component } from 'preact';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { doAuthRedirect } from '~/src/auth';

export type HeaderState = {
  menuAnchorElement: HTMLElement | null;
};

export default class Header extends Component<{}, HeaderState> {
  constructor() {
    super();
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Puzzle Tracker
          </Typography>
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
              <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
