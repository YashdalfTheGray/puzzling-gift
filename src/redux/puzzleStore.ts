import { UserCredential } from 'firebase/auth';

import {
  Puzzles,
  PuzzleSets,
  PuzzleClues,
  PuzzleSolutions,
} from '~/src/datastoreTypes';

import { IActionProcessingSlice } from './utils';

export type PuzzleStore = {
  currentUser: UserCredential | null;
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

export enum ActionSliceNames {
  LoginResult = 'loginResultActionProcessing',
  Logout = 'logoutActionProcessing',
  GetPuzzleSet = 'getPuzzleSetActionProcessing',
  GetPuzzle = 'getPuzzleActionProcessing',
  GetPuzzleClue = 'getPuzzleClueActionProcessing',
  PutPuzzleClueSolved = 'putPuzzleClueSolvedActionProcessing',
  GetPuzzleSolution = 'getPuzzleSolutionActionProcessing',
}
