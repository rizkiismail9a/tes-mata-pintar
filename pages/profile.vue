<script setup lang="ts">
import { signOut } from "firebase/auth";
import LoadingState from "~/components/common/LoadingState.vue";
import MainButton from "~/components/common/MainButton.vue";

definePageMeta({
  middleware: "auth",
});

const { user, clearUser } = useAuthStore();
const { $auth } = useNuxtApp();

const isLoading = ref<boolean>(false);

const token = computed(() => {
  return user?.accessToken;
});

const logout = async () => {
  try {
    isLoading.value = true;
    await signOut($auth);

    const storedCookie = useCookie("accessToken");
    const storedUid = useCookie("userId");
    storedCookie.value = null;
    storedUid.value = null;

    clearUser();
    window.location.reload();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <LoadingState v-if="isLoading" />
  <CommonNavbar page="Akun" />
  <div
    class="py-[70px] px-4 flex flex-col gap-10 items-center justify-center h-screen overflow-y-auto"
  >
    <div
      id="profile-content"
      v-if="!token"
      class="flex items-center flex-col gap-4"
    >
      <img
        src="/illustration/sweet-koala.png"
        alt="sweet koala"
        title="image by Fuzzy Friend on blush design"
        class="w-[200px]"
      />
      <p class="text-center">
        Masuk untuk dapat akses berbagai fitur menarik kami
      </p>
      <MainButton
        label="Masuk"
        size="small"
        @click.native="$router.push('/login')"
      />
    </div>

    <div v-else class="flex items-center flex-col gap-4">
      <div>nama: {{ user?.fullName }}</div>
      <div>username: {{ user?.username }}</div>
      <div>email: {{ user?.email }}</div>
      <p>Note: Sementara gini dulu</p>

      <div
        @click="logout"
        class="flex items-center gap-3 border border-gray-950 p-2 rounded-md hover:bg-gray-300"
      >
        <img
          class="w-4 h-4"
          src="/icon/logout.png"
          alt="logout"
          title="icon by dmitri13"
        />
        <span>Keluar</span>
      </div>
    </div>
  </div>
  <CommonNavbarFooter />
</template>

<style scoped></style>
