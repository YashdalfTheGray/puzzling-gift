// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AccountButton from '~/src/components/AccountButton';

export type HeaderProps = {
  renderAccountButton: boolean;
};

export default class Header extends Component<HeaderProps> {
  render() {
    const { renderAccountButton } = this.props;

    return (
      <AppBar position="static" enableColorOnDark={true} color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Puzzle Tracker
          </Typography>
          {renderAccountButton ? <AccountButton /> : null}
        </Toolbar>
      </AppBar>
    );
  }
}
