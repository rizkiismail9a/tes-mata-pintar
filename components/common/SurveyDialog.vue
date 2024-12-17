<script setup lang="ts">
import MainButton from "./MainButton.vue";

const emit = defineEmits<{
  closeDialog: [];
}>();

const goToSurveyForm = () => {
  emit("closeDialog");
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSdNPllyjxElSho91s9x_SuaV3qexeoNVmSBvajbueKp8TWtdA/viewform?usp=header"
  );
};
</script>

<template>
  <div
    class="flex p-6 items-center justify-center gap-5 bg-gray-700/10 h-screen w-full fixed z-10 max-w-[570px]"
  >
    <div
      class="flex gap-4 bg-white rounded-md p-10 justify-center w-fit h-fit relative"
    >
      <div class="flex items-center gap-4 flex-col">
        <img
          src="/illustration/elegant-giraffe.png"
          alt="elegent-giraffe"
          class="w-[170px]"
          title="image by Fuzzy Friend on blush design"
        />
        <div class="text-center">
          Bagaimana pengalaman kamu bersama kami? Yuk, cerita
        </div>
        <MainButton
          label="Beri Masukan"
          size="small"
          @click.native="goToSurveyForm"
        />
      </div>
      <div class="h-[300px] absolute top-2 right-2">
        <img
          src="/icon/close-icon.png"
          alt="close"
          class="w-7"
          @click="emit('closeDialog')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
