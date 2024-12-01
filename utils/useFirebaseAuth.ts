import { createUserWithEmailAndPassword } from "firebase/auth";
import type { RegistrationResponse } from "~/types/register.type";
import type { User } from "~/types/user.type";

export const useFirebaseAuth = () => {
  const { $auth } = useNuxtApp();
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

      const d = new Date();
      d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
      let expires = d.toUTCString();

      setCookies(
        "accessToken",
        (data as unknown as RegistrationResponse).user.accessToken,
        expires
      );

      return data as unknown as RegistrationResponse;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    registration,
  };
};
