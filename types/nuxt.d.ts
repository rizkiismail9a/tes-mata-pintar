import type { Auth } from "firebase/auth";
import type { Database } from "firebase/database";

declare module "#app" {
  interface NuxtApp {
    $firebaseDB: Database; // Sesuaikan dengan tipe Firebase Anda
    $auth: Auth;
  }
}
