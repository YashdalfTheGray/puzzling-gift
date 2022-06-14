import { Component } from 'preact';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AccountButton from '~/src/Components/AccountButton';

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
      <AppBar position="static" enableColorOnDark={true} color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Puzzle Tracker
          </Typography>
          <AccountButton />
        </Toolbar>
      </AppBar>
    );
  }
}
