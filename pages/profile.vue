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
    class="pt-[70px] pb-[90px] px-4 flex flex-col gap-10 items-center justify-center h-screen overflow-y-auto"
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

    <div v-else class="flex justify-between h-full w-full flex-col gap-4">
      <div class="flex gap-4">
        <div
          id="profile-photo"
          class="flex w-fit items-center rounded-full justify-center border border-tmp-green"
        >
          <img
            src="/public/icon/logo-tmp.png"
            alt="user-profile"
            class="w-[120px] h-[120px] object-contain"
          />
        </div>

        <div class="flex gap-2 justify-center flex-col py-5">
          <h3 class="font-semibold text-lg">{{ user?.fullName }}</h3>
          <div class="text-sm">{{ user?.username }}</div>
        </div>
      </div>

      <div class="flex flex-col items-center gap-4">
        <img
          src="/illustration/sweet-koala.png"
          alt="sweet koala"
          title="image by Fuzzy Friend on blush design"
          class="w-[200px]"
        />
        <p class="text-center">Kamu belum ambil tes apapun</p>
      </div>

      <div
        @click="logout"
        class="flex items-center gap-3 border w-[100px] border-gray-950 p-2 rounded-md hover:bg-gray-300 mx-auto"
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
