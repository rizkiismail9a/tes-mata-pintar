<script setup lang="ts">
import MainButton from "~/components/common/MainButton.vue";
</script>

<template>
  <CommonNavbar page="Akun" />
  <div
    class="py-[70px] px-4 flex flex-col gap-10 items-center justify-center h-screen overflow-y-auto"
  >
    <div id="profile-content" class="flex items-center flex-col gap-4">
      <img
        src="/illustration/sweet-koala.png"
        alt="sweet koala"
        title="image by Fuzzy Friend on blush design"
        class="w-[200px]"
      />
      <p>Masuk untuk dapat akses berbagai fitur menarik di sini</p>
      <MainButton
        label="Masuk"
        size="small"
        @click.native="$router.push('/login')"
      />
    </div>
  </div>
  <CommonNavbarFooter />
</template>

<style scoped></style>
