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
      localStorage.setItem("user", JSON.stringify(data));
    },

    loadUser() {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser); // Muat dari localStorage
      }
    },

    clearUser() {
      this.user = null;
    },

    updateProfilePicture(data: string) {
      if (this.user) {
        this.user.photoProfile = data;
      }
    },
  },

  // persist: true,
});
