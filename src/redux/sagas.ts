import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { UserCredential } from 'firebase/auth';

import {
  getOnePuzzleClueForId,
  getBatchPuzzleClueForId,
  getOnePuzzleSolutionForId,
  getBatchPuzzleSolutionForId,
  getPuzzleById,
  getPuzzleSetById,
  putPuzzleClueSolvedForId,
} from '~/src/firebase';
import { doAuthRedirect, getAuthResult, doSignOut } from '~/src/auth';
import { Puzzle, PuzzleClue, PuzzleSet } from '~/src/datastoreTypes';

import * as actions from './actions';

const PuzzleActions = actions.PuzzleActions;

export function* loginStart(
  _action: ReturnType<typeof PuzzleActions.loginStart>
) {
  try {
    yield call(doAuthRedirect);
  } catch (e) {
    yield put(PuzzleActions.loginError(e));

    throw e;
  }
}

export function* loginResult(
  _action: ReturnType<typeof PuzzleActions.loginResult>
) {
  try {
    const user: UserCredential = yield call(getAuthResult) || null;
    yield put(PuzzleActions.loginSuccess(user));
  } catch (e) {
    yield put(PuzzleActions.loginError(e));

    throw e;
  }
}

export function* logoutUser(_action: ReturnType<typeof PuzzleActions.logout>) {
  try {
    yield call(doSignOut);
    yield put(PuzzleActions.logoutSuccess());
  } catch (e) {
    yield put(PuzzleActions.logoutError(e));

    throw e;
  }
}

export function* getPuzzleSetSaga(
  action: ReturnType<typeof PuzzleActions.getPuzzleSet>
) {
  try {
    const puzzleSet: PuzzleSet = yield call(getPuzzleSetById, action.payload);
    yield put(PuzzleActions.getPuzzleSetSuccess(puzzleSet));
  } catch (e) {
    yield put(PuzzleActions.getPuzzleSetError(e));

    throw e;
  }
}

export function* getPuzzleSaga(
  action: ReturnType<typeof PuzzleActions.getPuzzle>
) {
  try {
    const puzzle: Puzzle = yield call(getPuzzleById, action.payload);
    yield put(PuzzleActions.getPuzzleSuccess(puzzle));
  } catch (e) {
    yield put(PuzzleActions.getPuzzleError(e));

    throw e;
  }
}

export function* getPuzzleClueSaga(
  action: ReturnType<typeof PuzzleActions.getPuzzleClue>
) {
  try {
    const clue: PuzzleClue = yield call(
      getOnePuzzleClueForId,
      action.payload.id,
      action.payload.clueNumber
    );
    yield put(
      PuzzleActions.getPuzzleClueSuccess({
        id: action.payload.id,
        clueNumber: action.payload.clueNumber,
        clue,
      })
    );
  } catch (e) {
    yield put(PuzzleActions.getPuzzleClueError(e));

    throw e;
  }
}

export function* getBatchPuzzleClueSaga(
  action: ReturnType<typeof PuzzleActions.getBatchPuzzleClue>
) {
  try {
    const clues: PuzzleClue[] = yield call(
      getBatchPuzzleClueForId,
      action.payload.id,
      action.payload.until
    );
    yield put(
      PuzzleActions.getBatchPuzzleClueSuccess({
        id: action.payload.id,
        until: action.payload.until,
        clues,
      })
    );
  } catch (e) {
    yield put(PuzzleActions.getBatchPuzzleClueError(e));

    throw e;
  }
}

export function* getPuzzleSolutionSaga(
  action: ReturnType<typeof PuzzleActions.getPuzzleSolution>
) {
  try {
    const solution: string = yield call(
      getOnePuzzleSolutionForId,
      action.payload.id,
      action.payload.solutionNumber
    );
    yield put(
      PuzzleActions.getPuzzleSolutionSuccess({
        id: action.payload.id,
        solutionNumber: action.payload.solutionNumber,
        solution,
      })
    );
  } catch (e) {
    yield put(PuzzleActions.getPuzzleSolutionError(e));

    throw e;
  }
}

export function* getBatchPuzzleSolutionSaga(
  action: ReturnType<typeof PuzzleActions.getBatchPuzzleSolution>
) {
  try {
    const solutions: string[] = yield call(
      getBatchPuzzleSolutionForId,
      action.payload.id,
      action.payload.until
    );
    yield put(
      PuzzleActions.getBatchPuzzleSolutionSuccess({
        id: action.payload.id,
        until: action.payload.until,
        solutions,
      })
    );
  } catch (e) {
    yield put(PuzzleActions.getBatchPuzzleSolutionError(e));

    throw e;
  }
}

export function* putPuzzleClueSolvedSaga(
  action: ReturnType<typeof PuzzleActions.putPuzzleClueSolved>
) {
  try {
    yield call(
      putPuzzleClueSolvedForId,
      action.payload.id,
      action.payload.clueNumber
    );
    yield put(PuzzleActions.putPuzzleClueSolvedSuccess());

    yield put(PuzzleActions.getPuzzle(action.payload.id));
    const puzzle: Puzzle = yield call(getPuzzleById, action.payload.id);
    yield put(PuzzleActions.getPuzzleSuccess(puzzle));
  } catch (e) {
    yield put(PuzzleActions.putPuzzleClueSolvedError(e));

    throw e;
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.LOGIN_START, loginStart),
    takeLatest(actions.LOGIN_RESULT, loginResult),
    takeLatest(actions.LOGOUT, logoutUser),
    takeEvery(actions.GET_PUZZLESET, getPuzzleSetSaga),
    takeEvery(actions.GET_PUZZLE, getPuzzleSaga),
    takeEvery(actions.GET_PUZZLE_CLUE, getPuzzleClueSaga),
    takeEvery(actions.GET_BATCH_PUZZLE_CLUE, getBatchPuzzleClueSaga),
    takeEvery(actions.GET_PUZZLE_SOLUTION, getPuzzleSolutionSaga),
    takeEvery(actions.GET_BATCH_PUZZLE_SOLUTION, getBatchPuzzleSolutionSaga),
    takeLatest(actions.PUT_PUZZLE_CLUE_SOLVED, putPuzzleClueSolvedSaga),
  ]);
}
