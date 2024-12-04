import type { User } from "~/types/user.type";

interface AuthState {
  user?: User;
}

export const useAuthStore = defineStore("authStore", {
  state: (): AuthState => {
    return {
      user: null,
    };
  },

  actions: {
    setUser(data: User) {
      this.user = data;
    },

    clearUser() {
      this.user = null;
    },
  },

  persist: true,
});
