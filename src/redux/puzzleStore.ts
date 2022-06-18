import {
  Puzzles,
  PuzzleSets,
  PuzzleClues,
  PuzzleSolutions,
} from '~/src/datastoreTypes';

import { IActionProcessingSlice } from './utils';

export type PuzzleStore = {
  currentUser: {} | null;
  puzzles: Puzzles;
  puzzleSets: PuzzleSets;
  puzzleClues: PuzzleClues;
  puzzleSolutions: PuzzleSolutions;
  loginResultActionProcessing: IActionProcessingSlice;
  logoutActionProcessing: IActionProcessingSlice;
  getPuzzleSetActionProcessing: IActionProcessingSlice;
  getPuzzleActionProcessing: IActionProcessingSlice;
  getPuzzleClueActionProcessing: IActionProcessingSlice;
  putPuzzleClueSolvedActionProcessing: IActionProcessingSlice;
  getPuzzleSolutionActionProcessing: IActionProcessingSlice;
};
