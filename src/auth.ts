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
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
