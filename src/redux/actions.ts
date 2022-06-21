import { UserCredential } from 'firebase/auth';

import { Puzzle, PuzzleClue, PuzzleSet, UUID } from '~/src/datastoreTypes';

import { ActionsMap, createAction } from './utils';

export const LOGIN_START = '[auth] login start';
export const LOGIN_RESULT = '[auth] login result';
export const LOGIN_SUCCESS = '[auth] login success';
export const LOGIN_ERROR = '[auth] login error';

export const LOGOUT = '[auth] logout';
export const LOGOUT_SUCCESS = '[auth] logout success';
export const LOGOUT_ERROR = '[auth] logout error';

export const GET_PUZZLESET = '[puzzleset] get';
export const GET_PUZZLESET_SUCCESS = '[puzzleset] get success';
export const GET_PUZZLESET_ERROR = '[puzzleset] get error';

export const GET_PUZZLE = '[puzzle] get';
export const GET_PUZZLE_SUCCESS = '[puzzle] get success';
export const GET_PUZZLE_ERROR = '[puzzle] get error';

export const GET_PUZZLE_CLUE = '[puzzle clue] get';
export const GET_PUZZLE_CLUE_SUCCESS = '[puzzle clue] get success';
export const GET_PUZZLE_CLUE_ERROR = '[puzzle clue] get error';

export const GET_BATCH_PUZZLE_CLUE = '[puzzle clue] get batch';
export const GET_BATCH_PUZZLE_CLUE_SUCCESS = '[puzzle clue] get batch success';
export const GET_BATCH_PUZZLE_CLUE_ERROR = '[puzzle clue] get batch error';

export const PUT_PUZZLE_CLUE_SOLVED = '[puzzle] put solved';
export const PUT_PUZZLE_CLUE_SOLVED_SUCCESS = '[puzzle] put solved success';
export const PUT_PUZZLE_CLUE_SOLVED_ERROR = '[puzzle] put solved error';

export const GET_PUZZLE_SOLUTION = '[puzzle solution] get';
export const GET_PUZZLE_SOLUTION_SUCCESS = '[puzzle solution] get success';
export const GET_PUZZLE_SOLUTION_ERROR = '[puzzle solution] get error';

export const GET_BATCH_PUZZLE_SOLUTION = '[puzzle solution] get batch';
export const GET_BATCH_PUZZLE_SOLUTION_SUCCESS =
  '[puzzle solution] get batch success';
export const GET_BATCH_PUZZLE_SOLUTION_ERROR =
  '[puzzle solution] get batch error';

export const PuzzleActions = {
  loginStart: () => createAction(LOGIN_START),
  loginResult: () => createAction(LOGIN_RESULT),
  loginSuccess: (user: UserCredential) => createAction(LOGIN_SUCCESS, user),
  loginError: (error: Error) => createAction(LOGIN_ERROR, error),

  logout: () => createAction(LOGOUT),
  logoutSuccess: () => createAction(LOGOUT_SUCCESS),
  logoutError: (error: Error) => createAction(LOGOUT_ERROR, error),

  getPuzzleSet: (id: UUID) => createAction(GET_PUZZLESET, id),
  getPuzzleSetSuccess: (puzzleSet: PuzzleSet) =>
    createAction(GET_PUZZLESET_SUCCESS, puzzleSet),
  getPuzzleSetError: (error: Error) => createAction(GET_PUZZLESET_ERROR, error),

  getPuzzle: (id: UUID) => createAction(GET_PUZZLE, id),
  getPuzzleSuccess: (puzzle: Puzzle) =>
    createAction(GET_PUZZLE_SUCCESS, puzzle),
  getPuzzleError: (error: Error) => createAction(GET_PUZZLE_ERROR, error),

  getPuzzleClue: (payload: { id: UUID; clueNumber: number }) =>
    createAction(GET_PUZZLE_CLUE, payload),
  getPuzzleClueSuccess: (payload: {
    id: UUID;
    clueNumber: number;
    clue: PuzzleClue;
  }) => createAction(GET_PUZZLE_CLUE_SUCCESS, payload),
  getPuzzleClueError: (error: Error) =>
    createAction(GET_PUZZLE_CLUE_ERROR, error),

  getBatchPuzzleClue: (payload: { id: UUID; until: number }) =>
    createAction(GET_BATCH_PUZZLE_CLUE, payload),
  getBatchPuzzleClueSuccess: (payload: {
    id: UUID;
    until: number;
    clues: PuzzleClue[];
  }) => createAction(GET_BATCH_PUZZLE_CLUE_SUCCESS, payload),
  getBatchPuzzleClueError: (error: Error) =>
    createAction(GET_BATCH_PUZZLE_CLUE_ERROR, error),

  putPuzzleClueSolved: (payload: { id: UUID; clueNumber: number }) =>
    createAction(PUT_PUZZLE_CLUE_SOLVED, payload),
  putPuzzleClueSolvedSuccess: () =>
    createAction(PUT_PUZZLE_CLUE_SOLVED_SUCCESS),
  putPuzzleClueSolvedError: (error: Error) =>
    createAction(PUT_PUZZLE_CLUE_SOLVED_ERROR, error),

  getPuzzleSolution: (payload: { id: UUID; solutionNumber: number }) =>
    createAction(GET_PUZZLE_SOLUTION, payload),
  getPuzzleSolutionSuccess: (payload: {
    id: UUID;
    solutionNumber: number;
    solution: string;
  }) => createAction(GET_PUZZLE_SOLUTION_SUCCESS, payload),
  getPuzzleSolutionError: (error: Error) =>
    createAction(GET_PUZZLE_SOLUTION_ERROR, error),

  getBatchPuzzleSolution: (payload: { id: UUID; until: number }) =>
    createAction(GET_BATCH_PUZZLE_SOLUTION, payload),
  getBatchPuzzleSolutionSuccess: (payload: {
    id: UUID;
    until: number;
    solutions: string[];
  }) => createAction(GET_BATCH_PUZZLE_SOLUTION_SUCCESS, payload),
  getBatchPuzzleSolutionError: (error: Error) =>
    createAction(GET_BATCH_PUZZLE_SOLUTION_ERROR, error),
};

export type PuzzleActions = ActionsMap<typeof PuzzleActions>;
