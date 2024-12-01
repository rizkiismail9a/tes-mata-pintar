export type RegistrationResponse = {
  user: {
    accessToken: string;
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    // providerData: [
    //   {
    //     providerId: "password";
    //     uid: "ceceng@mail.com";
    //     displayName: null;
    //     email: "ceceng@mail.com";
    //     phoneNumber: null;
    //     photoURL: null;
    //   }
    // ];
    stsTokenManager: {
      refreshToken: string;
      accessToken: string;
      expirationTime: number;
    };
    createdAt: string; // ex: "1732929088415";
    lastLoginAt: string; // ex: "1732929088415";
    apiKey: string;
    appName: string;
  };
  operationType: "signIn";
};
