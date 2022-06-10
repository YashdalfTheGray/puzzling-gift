// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, child, get } from 'firebase/database';

import { NoPuzzlesFoundForUserError } from '~/src/errors';

const {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_NAME,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
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
  }
}

export function getAppAnalyticsInstance(app?: FirebaseApp) {
  return getAnalytics(app || getApp());
}

export async function getPuzzlesForUser(userId: string) {
  try {
    const app = getApp();
    const dbRef = ref(getDatabase(app));
    const snapshot = await get(child(dbRef, `users/${userId}`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new NoPuzzlesFoundForUserError(userId);
    }
  } catch (e) {
    console.error(e);
  }
}
