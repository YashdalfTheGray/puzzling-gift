// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';

import { UserCredential } from 'firebase/auth';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AccountButton from '~/src/components/AccountButton';

export type HeaderProps = {
  authResult: UserCredential | null | undefined;
};

export default class Header extends Component<HeaderProps, {}> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    const { authResult } = this.props;

    const profilePictureUrl = authResult?.user?.photoURL;
    const userName = authResult?.user?.displayName;

    return (
      <AppBar position="static" enableColorOnDark={true} color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Puzzle Tracker
          </Typography>
          <AccountButton
            isAuthenticated={authResult !== null}
            profilePictureUrl={profilePictureUrl || ''}
            userName={userName || ''}
          />
        </Toolbar>
      </AppBar>
    );
  }
}
