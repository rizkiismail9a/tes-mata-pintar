<script setup lang="ts">
import MainButton from "../common/MainButton.vue";

const emits = defineEmits<{
  loginLater: [];
  loginNow: [];
}>();

const loginLater = () => {
  emits("loginLater");
};

const loginNow = () => {
  emits("loginNow");
};
</script>

<template>
  <div
    class="fixed z-50 bg-black/20 w-full max-w-[570px] h-screen flex items-center justify-center"
  >
    <div
      id="login-dialog"
      class="bg-white rounded-md w-[90%] p-5 shadow-md h-[80%] flex items-center justify-center"
    >
      <div class="flex flex-col gap-5 items-center">
        <img
          src="/public/illustration/little-elephant.png"
          alt="little-elephant"
          class="w-[80%]"
        />
        <div class="flex flex-col gap-3 items-center">
          <span class="font-bold">Ayo, masuk</span>
          <span class="text-center"
            >supaya hasil tes kamu bisa tersimpan di history</span
          >
        </div>
        <MainButton label="Masuk" size="small" @click.native="loginNow" />
        <MainButton
          label="Nanti aja"
          size="small"
          text-only
          @click.native="loginLater"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
