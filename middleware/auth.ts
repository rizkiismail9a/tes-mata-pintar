export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const accessToken = useCookie("accessToken");

    if (to.path === "/login" || to.path === "/register") {
      if (accessToken.value) {
        return navigateTo("/profile");
      }
    }
  }
});
