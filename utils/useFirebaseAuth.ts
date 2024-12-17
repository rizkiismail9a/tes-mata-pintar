import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { LoginResponse } from "~/types/login.type";
import type { RegistrationResponse } from "~/types/register.type";
import type { User } from "~/types/user.type";

export const useFirebaseAuth = () => {
  const { $auth, $cookies } = useNuxtApp();
  const authStore = useAuthStore();

  const registration = async (
    email: string,
    password: string,
    fullName: string,
    username: string
  ): Promise<RegistrationResponse | undefined> => {
    try {
      const data = await createUserWithEmailAndPassword($auth, email, password);

      const user: User = {
        email: data.user.email as string,
        fullName: fullName,
        username: username,
        accessToken: (data as unknown as RegistrationResponse).user
          .accessToken as string,
      };

      authStore.setUser(user);

      // const d = new Date();
      let expires = 30 * 24 * 60 * 60 * 1000;

      $cookies.setCookies(
        "accessToken",
        (data as unknown as RegistrationResponse).user.accessToken,
        expires
      );

      $cookies.setCookies("userId", data.user.uid, expires);

      return data as unknown as RegistrationResponse;
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword($auth, email, password);

      return response as unknown as LoginResponse;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    registration,
    login,
  };
};
