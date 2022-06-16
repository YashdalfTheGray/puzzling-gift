import { UserCredential } from 'firebase/auth';
import { Puzzle, PuzzleSet, UUID } from '~/src/datastoreTypes';
import { ActionsMap, createAction } from './utils';

export const LOGIN = '[auth] login';
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

export const PUT_PUZZLE_CLUE_SOLVED = '[puzzle] put solved';
export const PUT_PUZZLE_CLUE_SOLVED_SUCCESS = '[puzzle] put solved success';
export const PUT_PUZZLE_CLUE_SOLVED_ERROR = '[puzzle] put solved error';

export const GET_PUZZLE_SOLUTION = '[puzzle solution] get';
export const GET_PUZZLE_SOLUTION_SUCCESS = '[puzzle solution] get success';
export const GET_PUZZLE_SOLUTION_ERROR = '[puzzle solution] get error';

export const PuzzleActions = {
  login: () => createAction(LOGIN),
  loginSuccess: (user: UserCredential) => createAction(LOGIN_SUCCESS, user),
  loginError: (error: Error) => createAction(LOGIN_ERROR, error),

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
    clue: string;
  }) => createAction(GET_PUZZLE_CLUE_SUCCESS, payload),
  getPuzzleClueError: (error: Error) =>
    createAction(GET_PUZZLE_CLUE_ERROR, error),

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
};

export type PuzzleActions = ActionsMap<typeof PuzzleActions>;
