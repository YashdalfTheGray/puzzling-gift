import { Component } from 'preact';

import { doAuthRedirect } from '~/src/auth';
import Title from '~/src/components/Title';

import './Header.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Title type="h1">Puzzle Tracker</Title>
        <span
          className="material-symbols-outlined login-icon"
          onClick={doAuthRedirect}>
          login
        </span>
      </div>
    );
  }
}
