import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { UserCredential } from 'firebase/auth';
import { logEvent } from 'firebase/analytics';

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
import Events from '~/src/events';
import { getAppAnalyticsInstance } from '~/src/firebase';

import * as actions from './actions';

const PuzzleActions = actions.PuzzleActions;

export function* loginStart(
  _action: ReturnType<typeof PuzzleActions.loginStart>
) {
  try {
    logEvent(getAppAnalyticsInstance(), Events.LoginStart);
    yield call(doAuthRedirect);
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.LoginError, e);
    yield put(PuzzleActions.loginError(e));

    throw e;
  }
}

export function* loginResult(
  _action: ReturnType<typeof PuzzleActions.loginResult>
) {
  try {
    logEvent(getAppAnalyticsInstance(), Events.LoginResult);
    const user: UserCredential = yield call(getAuthResult) || null;
    logEvent(getAppAnalyticsInstance(), Events.LoginSuccess);
    yield put(PuzzleActions.loginSuccess(user));
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.LoginError, e);
    yield put(PuzzleActions.loginError(e));

    throw e;
  }
}

export function* logoutUser(_action: ReturnType<typeof PuzzleActions.logout>) {
  try {
    logEvent(getAppAnalyticsInstance(), Events.Logout);
    yield call(doSignOut);
    logEvent(getAppAnalyticsInstance(), Events.LogoutSuccess);
    yield put(PuzzleActions.logoutSuccess());
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.LogoutError, e);
    yield put(PuzzleActions.logoutError(e));

    throw e;
  }
}

export function* getPuzzleSetSaga(
  action: ReturnType<typeof PuzzleActions.getPuzzleSet>
) {
  try {
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzleset);
    const puzzleSet: PuzzleSet = yield call(getPuzzleSetById, action.payload);
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzlesetSuccess);
    yield put(PuzzleActions.getPuzzleSetSuccess(puzzleSet));
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzlesetError, e);
    yield put(PuzzleActions.getPuzzleSetError(e));

    throw e;
  }
}

export function* getPuzzleSaga(
  action: ReturnType<typeof PuzzleActions.getPuzzle>
) {
  try {
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzle);
    const puzzle: Puzzle = yield call(getPuzzleById, action.payload);
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzleSuccess);
    yield put(PuzzleActions.getPuzzleSuccess(puzzle));
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzleError, e);
    yield put(PuzzleActions.getPuzzleError(e));

    throw e;
  }
}

export function* getPuzzleClueSaga(
  action: ReturnType<typeof PuzzleActions.getPuzzleClue>
) {
  try {
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzleClue);
    const clue: PuzzleClue = yield call(
      getOnePuzzleClueForId,
      action.payload.id,
      action.payload.clueNumber
    );
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzleClueSuccess);
    yield put(
      PuzzleActions.getPuzzleClueSuccess({
        id: action.payload.id,
        clueNumber: action.payload.clueNumber,
        clue,
      })
    );
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzleClueError, e);
    yield put(PuzzleActions.getPuzzleClueError(e));

    throw e;
  }
}

export function* getBatchPuzzleClueSaga(
  action: ReturnType<typeof PuzzleActions.getBatchPuzzleClue>
) {
  try {
    logEvent(getAppAnalyticsInstance(), Events.GetBatchPuzzleClue);
    const clues: PuzzleClue[] = yield call(
      getBatchPuzzleClueForId,
      action.payload.id,
      action.payload.until
    );
    logEvent(getAppAnalyticsInstance(), Events.GetBatchPuzzleClueSuccess);
    yield put(
      PuzzleActions.getBatchPuzzleClueSuccess({
        id: action.payload.id,
        until: action.payload.until,
        clues,
      })
    );
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.GetBatchPuzzleClueError, e);
    yield put(PuzzleActions.getBatchPuzzleClueError(e));

    throw e;
  }
}

export function* getPuzzleSolutionSaga(
  action: ReturnType<typeof PuzzleActions.getPuzzleSolution>
) {
  try {
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzleSolution);
    const solution: string = yield call(
      getOnePuzzleSolutionForId,
      action.payload.id,
      action.payload.solutionNumber
    );
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzleSolutionSuccess);
    yield put(
      PuzzleActions.getPuzzleSolutionSuccess({
        id: action.payload.id,
        solutionNumber: action.payload.solutionNumber,
        solution,
      })
    );
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.GetPuzzleSolutionError, e);
    yield put(PuzzleActions.getPuzzleSolutionError(e));

    throw e;
  }
}

export function* getBatchPuzzleSolutionSaga(
  action: ReturnType<typeof PuzzleActions.getBatchPuzzleSolution>
) {
  try {
    logEvent(getAppAnalyticsInstance(), Events.GetBatchPuzzleSolution);
    const solutions: string[] = yield call(
      getBatchPuzzleSolutionForId,
      action.payload.id,
      action.payload.until
    );
    logEvent(getAppAnalyticsInstance(), Events.GetBatchPuzzleSolutionSuccess);
    yield put(
      PuzzleActions.getBatchPuzzleSolutionSuccess({
        id: action.payload.id,
        until: action.payload.until,
        solutions,
      })
    );
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.GetBatchPuzzleSolutionError, e);
    yield put(PuzzleActions.getBatchPuzzleSolutionError(e));

    throw e;
  }
}

export function* putPuzzleClueSolvedSaga(
  action: ReturnType<typeof PuzzleActions.putPuzzleClueSolved>
) {
  const { id, clueNumber } = action.payload;

  try {
    logEvent(getAppAnalyticsInstance(), Events.PutPuzzleClueSolved);
    yield call(putPuzzleClueSolvedForId, id, clueNumber);
    logEvent(getAppAnalyticsInstance(), Events.PutPuzzleClueSolvedSuccess);
    yield put(PuzzleActions.putPuzzleClueSolvedSuccess());

    yield put(PuzzleActions.getPuzzle(id));
    if (clueNumber < 10) {
      // TODO 2022/06/22 @YashdalfTheGray
      // figure out a better way to handle this case
      yield put(PuzzleActions.getPuzzleClue({ id, clueNumber }));
    }
    yield put(
      PuzzleActions.getPuzzleSolution({ id, solutionNumber: clueNumber - 1 })
    );
  } catch (e) {
    logEvent(getAppAnalyticsInstance(), Events.PutPuzzleClueSolvedError, e);
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
