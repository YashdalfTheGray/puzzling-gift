import { Component } from 'preact';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AccountButton from '~/src/Components/AccountButton';
import { UserCredential } from 'firebase/auth';

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

    return (
      <AppBar position="static" enableColorOnDark={true} color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Puzzle Tracker
          </Typography>
          <AccountButton
            isAuthenticated={authResult !== null}
            profilePictureUrl={profilePictureUrl || ''}
          />
        </Toolbar>
      </AppBar>
    );
  }
}
