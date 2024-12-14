<script setup lang="ts">
import MainButton from "~/components/common/MainButton.vue";
import LoginDialog from "~/components/TestView/LoginDialog.vue";

const { $cookies } = useNuxtApp();
const router = useRouter();

const showLoginDialog = ref<boolean>(true);

onMounted(() => {
  checkLogin();
});

const checkLogin = () => {
  const token = $cookies.getCookies("accessToken");

  if (token) {
    showLoginDialog.value = false;
  }
};

const goToLogin = () => {
  router.push({
    path: "/login",
    query: {
      redirect: "eye-test",
    },
  });
};
</script>

<template>
  <CommonNavbar page="tes" />
  <div
    class="py-[70px] px-4 flex flex-col gap-10 items-center justify-center h-screen overflow-y-auto"
  >
    <LoginDialog
      v-if="showLoginDialog"
      @login-later="showLoginDialog = false"
      @login-now="goToLogin"
    />

    <div class="flex flex-col items-center gap-5">
      <img src="/public/illustration/playful-fox.png" alt="fox" />
      <p>Mulai tes gratis dengan memilih salah satu menu di bawah ini</p>

      <MainButton
        label="Mulai Tes Rabun"
        size="medium"
        @click.native="router.push('/eye-test/sight')"
      />
      <MainButton
        label="Mulai Tes Buta Warna"
        size="medium"
        @click.native="router.push('/eye-test/color-blind')"
      />
    </div>
  </div>
  <CommonNavbarFooter />
</template>

<style scoped></style>
