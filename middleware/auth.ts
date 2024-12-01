export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (to.path === "/login" || to.path === "/register") {
    if (import.meta.client && authStore.user.accessToken) {
      return navigateTo("/profile");
    }
  }
});
