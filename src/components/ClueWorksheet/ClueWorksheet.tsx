// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component, ChangeEvent, KeyboardEvent } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { PuzzleClue } from '~/src/datastoreTypes';

import './ClueWorksheet.scss';

export type ClueWorksheetProps = {
  clue: PuzzleClue;
  readonly: boolean;
  onSuccessfulGuess?: () => void;
};

export type ClueWorksheetState = {
  currentGuess: string;
  tryAgainMessage: string;
};

export default class ClueWorksheet extends Component<
  ClueWorksheetProps,
  ClueWorksheetState
> {
  constructor(props: ClueWorksheetProps) {
    super(props);

    this.state = {
      currentGuess: '',
      tryAgainMessage: '',
    };
  }

  handleGuessChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentGuess: event.target.value,
      tryAgainMessage: '',
    });
  };

  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { clue, onSuccessfulGuess } = this.props;
    const { currentGuess } = this.state;

    if (
      clue.answer.toLowerCase() === currentGuess.toLowerCase() &&
      onSuccessfulGuess
    ) {
      this.setState({
        currentGuess: '',
        tryAgainMessage: '',
      });
      onSuccessfulGuess();
    } else if (clue.answer.toLowerCase() !== currentGuess.toLowerCase()) {
      this.setState({
        currentGuess: '',
        tryAgainMessage: 'not quite right',
      });
    }
  };

  render() {
    const { clue, readonly } = this.props;
    const { currentGuess, tryAgainMessage } = this.state;

    if (!clue) {
      return null;
    }

    if (readonly) {
      return (
        <Card className="ClueWorksheet">
          <CardContent>
            <Typography variant="h5">{clue.text}</Typography>
            <Typography variant="h5" sx={{ color: 'success.main' }}>
              {clue.answer}
            </Typography>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Card>
          <CardContent>
            <Typography variant="h5">{clue.text}</Typography>
            <TextField
              fullWidth={true}
              label="Guess"
              variant="standard"
              value={currentGuess}
              onChange={this.handleGuessChange}
              onKeyDown={this.handleKeyDown}
              helperText={tryAgainMessage}
              error={!!tryAgainMessage}
            />
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.handleSubmit}>
              Check
            </Button>
          </CardActions>
        </Card>
      );
    }
  }
}
