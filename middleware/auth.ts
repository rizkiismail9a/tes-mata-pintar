export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const authStore = useAuthStore();
    const accessToken = authStore.user.accessToken;

    if (to.path === "/login" || to.path === "/register") {
      if (accessToken) {
        return navigateTo("/profile");
      }
    }
  }
});
