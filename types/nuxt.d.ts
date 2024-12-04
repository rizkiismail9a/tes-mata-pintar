import type { Auth } from "firebase/auth";
import type { Database } from "firebase/database";

type Cookies = {
  setCookies: (name: string, value: string, expireInSeconds: number) => void;
  getCookies: (name: string) => string;
};

declare module "#app" {
  interface NuxtApp {
    $firebaseDB: Database; // Sesuaikan dengan tipe Firebase Anda
    $auth: Auth;
    $cookies: Cookies;
  }
}
