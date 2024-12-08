import { child, ref as fbRef, get } from "firebase/database";

/**
 *
 * @param {string} uid; Token as path to the users database
 * @param {string} token; from firebase when login
 */
export const getUserProfile = async (uid: string, token: string) => {
  try {
    const { $firebaseDB, $cookies } = useNuxtApp();
    const authStore = useAuthStore();

    const dbRef = fbRef($firebaseDB);

    const data = await get(child(dbRef, `users/${uid}`));

    authStore.setUser({ ...data.val(), accessToken: token });

    let expires = 30 * 24 * 60 * 60; // A month

    $cookies.setCookies("accessToken", token, expires);
    $cookies.setCookies("userId", uid, expires);
  } catch (error) {
    console.error("error get user", error);
  }
};
