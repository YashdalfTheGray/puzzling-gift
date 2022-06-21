import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';

export async function doAuthRedirect() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  auth.useDeviceLanguage();
  await signInWithRedirect(auth, provider);
}

export async function getAuthResult() {
  const auth = getAuth();
  try {
    const result = await getRedirectResult(auth);

    // console.group('Auth related information');
    // console.log(result);
    // console.groupEnd();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function doSignOut() {
  const auth = getAuth();
  await auth.signOut();
}
