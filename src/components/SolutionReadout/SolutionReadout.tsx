// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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
      <Paper
        className="SolutionReadout"
        sx={{ backgroundColor: 'background.default' }}>
        <Typography>Puzzle Solution</Typography>
        <span className="solution-row">
          <span>
            <ArrowRightIcon />
          </span>
          {this.fillWithBlanks(solutions, 10).map((s, i) => (
            <Paper className="single-solution" key={i} elevation={1}>
              {s}
            </Paper>
          ))}
          <span>
            <ArrowLeftIcon />
          </span>
        </span>
      </Paper>
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
