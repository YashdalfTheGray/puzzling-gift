// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';

import './Footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        Designed and developed in the open by&nbsp;
        <a href="https://yashdalfthegray.github.io/" target="blank">
          Yash
        </a>
        .&nbsp;The code can be found&nbsp;
        <a
          href="https://github.com/YashdalfTheGray/puzzling-gift"
          target="blank">
          here
        </a>
        .
      </div>
    );
  }
}
