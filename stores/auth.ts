import type { User } from "~/types/user.type";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: {} as User,
    };
  },

  actions: {
    setUser(data: User) {
      this.user = data;
    },
  },

  persist: true,
});
