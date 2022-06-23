// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, child, get, update } from 'firebase/database';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import { UUID, PuzzleSet, PuzzleClue } from '~/src/datastoreTypes';

const {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_NAME,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_APPCHECK_KEY,
} = process.env;

export function initFirebaseApp() {
  try {
    return getApp();
  } catch (_) {
    const firebaseConfig = {
      apiKey: FIREBASE_API_KEY,
      authDomain: `${FIREBASE_PROJECT_NAME}.firebaseapp.com`,
      projectId: FIREBASE_PROJECT_NAME,
      storageBucket: `${FIREBASE_PROJECT_NAME}.appspot.com`,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
      appId: FIREBASE_APP_ID,
      measurementId: FIREBASE_MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);

    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(FIREBASE_APPCHECK_KEY!),
      isTokenAutoRefreshEnabled: true,
    });

    // type FirebaseDebugger = {
    //   firebase: FirebaseApp;
    //   getDatabase: typeof getDatabase;
    //   ref: typeof ref;
    //   child: typeof child;
    //   get: typeof get;
    //   update: typeof update;
    // };
    // (window as Window & typeof globalThis & FirebaseDebugger).firebase = app;
    // (window as Window & typeof globalThis & FirebaseDebugger).getDatabase =
    //   getDatabase;
    // (window as Window & typeof globalThis & FirebaseDebugger).ref = ref;
    // (window as Window & typeof globalThis & FirebaseDebugger).get = get;
    // (window as Window & typeof globalThis & FirebaseDebugger).child = child;
    // (window as Window & typeof globalThis & FirebaseDebugger).update = update;

    return app;
  }
}

export function getAppAnalyticsInstance(app?: FirebaseApp) {
  return getAnalytics(app || getApp());
}

export async function getPuzzleSetById(id: UUID) {
  const app = getApp();
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `puzzleSets/${id}`));

  if (snapshot.exists()) {
    return snapshot.val() as PuzzleSet;
  } else {
    throw new Error(`Puzzleset with id ${id} not found`);
  }
}

export async function getPuzzleById(id: UUID) {
  const app = getApp();
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `puzzles/${id}`));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error(`Puzzle with id ${id} not found`);
  }
}

export async function getOnePuzzleClueForId(id: UUID, index: number) {
  const app = getApp();
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `puzzleClues/${id}/${index}`));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error(`Puzzle clue with id ${id} and index ${index} not found`);
  }
}

export async function getBatchPuzzleClueForId(id: UUID, until: number) {
  const app = getApp();
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `puzzleClues/${id}`));

  if (snapshot.exists()) {
    const clues: PuzzleClue[] = snapshot.val();
    return clues.slice(0, until + 1 < clues.length ? until + 1 : clues.length);
  } else {
    throw new Error(`Puzzle clue with id ${id} until index ${until} not found`);
  }
}

export async function getOnePuzzleSolutionForId(id: UUID, index: number) {
  const app = getApp();
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `puzzleSolutions/${id}/${index}`));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error(
      `Puzzle solution with id ${id} and index ${index} not found`
    );
  }
}

export async function getBatchPuzzleSolutionForId(id: UUID, until: number) {
  const app = getApp();
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `puzzleSolutions/${id}`));

  if (snapshot.exists()) {
    const solutions: string[] = snapshot.val();
    return solutions.slice(
      0,
      until < solutions.length ? until : solutions.length
    );
  } else {
    throw new Error(
      `Puzzle solution with id ${id} until index ${until} not found`
    );
  }
}

export async function putPuzzleClueSolvedForId(id: UUID, index: number) {
  const app = getApp();
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `puzzles/${id}/cluesSolved`));

  if (snapshot.exists()) {
    const oldCluesSolved = snapshot.val();
    const newCluesSolved = oldCluesSolved + 1;

    if (newCluesSolved !== index) {
      throw new Error(
        `Out of order clue posted for puzzle ${id}, expected ${newCluesSolved} but got ${index}`
      );
    }

    const updates = {};
    updates[`puzzles/${id}/cluesSolved`] = newCluesSolved;

    return update(dbRef, updates);
  } else {
    throw new Error(`Puzzle with id ${id} not found`);
  }
}
