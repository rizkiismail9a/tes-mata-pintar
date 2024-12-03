// plugins/cookies.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  const setCookies = (name: string, value: string, expireInSeconds: number) => {
    const cookie = useCookie(name, {
      maxAge: expireInSeconds,
      sameSite: "strict",
      secure: false,
    });
    cookie.value = value;
  };

  const getCookies = (name: string) => {
    return useCookie(name).value || "";
  };

  nuxtApp.provide("cookies", { setCookies, getCookies });
});
