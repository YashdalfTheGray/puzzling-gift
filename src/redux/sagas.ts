import {
  all,
  call,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  getOnePuzzleClueForId,
  getPuzzleById,
  getPuzzleSetById,
  putPuzzleClueSolvedForId,
} from '../firebase';
import * as actions from './actions';
import { Puzzle, PuzzleSet } from '../datastoreTypes';

const PuzzleActions = actions.PuzzleActions;

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
    const clue: string = yield call(
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

export function* getPuzzleSolutionSaga(
  action: ReturnType<typeof PuzzleActions.getPuzzleSolution>
) {
  try {
    const solution: string = yield call(
      getOnePuzzleClueForId,
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
  } catch (e) {
    yield put(PuzzleActions.putPuzzleClueSolvedError(e));

    throw e;
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(PuzzleActions.getPuzzleSet, getPuzzleSetSaga),
    takeEvery(PuzzleActions.getPuzzle, getPuzzleSaga),
    takeEvery(PuzzleActions.getPuzzleClue, getPuzzleClueSaga),
    takeEvery(PuzzleActions.getPuzzleSolution, getPuzzleSolutionSaga),
    takeLatest(PuzzleActions.putPuzzleClueSolved, putPuzzleClueSolvedSaga),
  ]);
}
