import {
  Puzzles,
  PuzzleSets,
  PuzzleClues,
  PuzzleSolutions,
} from '~/src/datastoreTypes';

import { IActionProcessingSlice } from './utils';

export type PuzzleStore = {
  puzzles: Puzzles;
  puzzleSets: PuzzleSets;
  puzzleClues: PuzzleClues;
  puzzleSolutions: PuzzleSolutions;
  getPuzzleSetActionProcessing: IActionProcessingSlice;
  getPuzzleActionProcessing: IActionProcessingSlice;
  getPuzzleClueActionProcessing: IActionProcessingSlice;
  putPuzzleClueSolvedActionProcessing: IActionProcessingSlice;
  getPuzzleSolutionActionProcessing: IActionProcessingSlice;
};
