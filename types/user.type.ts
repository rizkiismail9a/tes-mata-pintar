export type User = {
  fullName: string;
  email: string;
  username: string;
  photoProfile?: string;
  accessToken: string;
} | null;

export type StoredUser =
  | (User & {
      uid: string;
    })
  | null;
