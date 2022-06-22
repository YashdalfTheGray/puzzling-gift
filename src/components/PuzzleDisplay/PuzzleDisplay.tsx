// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { Component } from 'preact';
import { Component } from 'react';
import { connect } from 'react-redux';

import { PuzzleStore, ActionSliceNames } from '~/src/redux/puzzleStore';
import * as puzzleSelectors from '~/src/redux/selectors';
import { PuzzleActions } from '~/src/redux/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SolutionReadout from '~/src/components/SolutionReadout';
import ClueWorksheet from '~/src/components/ClueWorksheet';
import DoneCard from '~/src/components/DoneCard';

import './PuzzleDisplay.scss';

const mapStateToProps = (
  state: PuzzleStore,
  ownProps: IPuzzleDisplayProps
) => ({
  puzzle: puzzleSelectors.getPuzzleById(state, ownProps.puzzleId),
  clues: puzzleSelectors.getAllPuzzleCluesById(state, ownProps.puzzleId),
  solutions: puzzleSelectors.getAllPuzzleSolutionsById(
    state,
    ownProps.puzzleId
  ),
  isLoadingGetPuzzle: puzzleSelectors.getIsProcessingByAction(
    state,
    ActionSliceNames.GetPuzzle
  ),
  isLoadingGetPuzzleClue: puzzleSelectors.getIsProcessingByAction(
    state,
    ActionSliceNames.GetPuzzleClue
  ),
  isLoadingGetPuzzleSolution: puzzleSelectors.getIsProcessingByAction(
    state,
    ActionSliceNames.GetPuzzleSolution
  ),
});

const mapDispatchToProps = {
  dispatchGetPuzzle: PuzzleActions.getPuzzle,
  dispatchGetOnePuzzleClue: PuzzleActions.getPuzzleClue,
  dispatchGetBatchPuzzleClues: PuzzleActions.getBatchPuzzleClue,
  dispatchGetOnePuzzleSolution: PuzzleActions.getPuzzleSolution,
  dispatchGetBatchPuzzleSolutions: PuzzleActions.getBatchPuzzleSolution,
  dispatchPutPuzzleClueSolved: PuzzleActions.putPuzzleClueSolved,
};

interface IPuzzleDisplayProps {
  puzzleId: string;
}

export type PuzzleDisplayProps = IPuzzleDisplayProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export class PuzzleDisplay extends Component<PuzzleDisplayProps> {
  componentDidMount() {
    const { dispatchGetPuzzle, puzzleId } = this.props;
    dispatchGetPuzzle(puzzleId);
  }

  componentDidUpdate(prevProps: PuzzleDisplayProps) {
    const { puzzle: prevPuzzle } = prevProps;
    const { puzzle: currPuzzle } = this.props;

    const {
      dispatchGetBatchPuzzleClues,
      dispatchGetBatchPuzzleSolutions,
      puzzleId,
    } = this.props;

    if (!prevPuzzle && !!currPuzzle) {
      dispatchGetBatchPuzzleClues({
        id: puzzleId,
        until: currPuzzle.cluesSolved,
      });

      if (currPuzzle.cluesSolved > 0) {
        dispatchGetBatchPuzzleSolutions({
          id: puzzleId,
          until: currPuzzle.cluesSolved,
        });
      }
    }
  }

  handleSuccessfulGuess = () => {
    const { dispatchPutPuzzleClueSolved, puzzle } = this.props;

    dispatchPutPuzzleClueSolved({
      id: puzzle.id,
      clueNumber: puzzle.cluesSolved + 1,
    });
  };

  render() {
    const {
      puzzle,
      isLoadingGetPuzzle,
      isLoadingGetPuzzleClue,
      isLoadingGetPuzzleSolution,
      clues,
      solutions,
    } = this.props;

    if (!isLoadingGetPuzzle && !puzzle) {
      return <div className="PuzzleDisplay not-found">Puzzle not found</div>;
    } else if (
      isLoadingGetPuzzle ||
      isLoadingGetPuzzleClue ||
      isLoadingGetPuzzleSolution
    ) {
      return (
        <div className="PuzzleDisplay loading">
          <CircularProgress sx={{ color: 'primary' }} thickness={5} />
        </div>
      );
    } else if (
      !isLoadingGetPuzzle &&
      !isLoadingGetPuzzleClue &&
      !isLoadingGetPuzzleSolution &&
      puzzle
    ) {
      // console.log({ puzzle, clues, solutions });
      return (
        <div className="PuzzleDisplay puzzle-found">
          <SolutionReadout solutions={[...solutions]} />
          {puzzle.cluesSolved < 10 ? (
            <ClueWorksheet
              clue={clues[clues.length - 1]}
              readonly={false}
              onSuccessfulGuess={this.handleSuccessfulGuess}
            />
          ) : (
            <DoneCard />
          )}
          {puzzle.cluesSolved > 0 ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="solved-clues-content"
                id="solved-clues-header">
                <Typography>Solved clues</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: 'background.default' }}>
                {clues.slice(0, puzzle.cluesSolved).map((c, i) => (
                  <ClueWorksheet key={i} clue={c} readonly={true} />
                ))}
              </AccordionDetails>
            </Accordion>
          ) : null}
        </div>
      );
    }
  }

  private fillWithBlanks(solutions: string[], desiredLength: number) {
    const result = [...solutions];
    while (result.length < desiredLength) {
      result.push('_');
    }

    return result;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleDisplay);
