export type LoginResponse = {
  user: {
    accessToken: string;
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerData: [
      {
        providerId: string;
        uid: string;
        displayName?: string;
        email: string;
        phoneNumber?: string;
        photoURL?: string;
      }
    ];
    stsTokenManager: {
      refreshToken: string;
      accessToken: string;
      expirationTime: number; // ex: 1733239707787
    };
    createdAt: string; // ex: "1733050804718"
    lastLoginAt: string; // ex: "1733236106386"
    apiKey: string;
    appName: string;
  };
  providerId?: string;
  _tokenResponse: {
    kind: string;
    localId: string;
    email: string;
    displayName: string;
    idToken: string;
    registered: boolean;
    refreshToken: string;
    expiresIn: string; // ex: "3600"
  };
  operationType: string;
};
