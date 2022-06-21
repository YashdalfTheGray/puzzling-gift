// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';

import Paper from '@mui/material/Paper';

import './SolutionReadout.scss';

export type SolutionReadoutProps = {
  solutions: string[];
};

export default class SolutionReadout extends Component<SolutionReadoutProps> {
  render() {
    const { solutions } = this.props;

    if (!solutions) {
      return null;
    }

    return (
      <div className="SolutionReadout">
        {this.fillWithBlanks(solutions, 10).map((s, i) => (
          <Paper className="single-solution" key={i} elevation={1}>
            {s}
          </Paper>
        ))}
      </div>
    );
  }

  private fillWithBlanks(solutions: string[], desiredLength: number) {
    const result = [...solutions];
    while (result.length < desiredLength) {
      result.push('_');
    }

    return result;
  }
}
