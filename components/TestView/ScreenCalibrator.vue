<script setup lang="ts">
import MainButton from "../common/MainButton.vue";

const rangeValue = ref<number>(400);
const emits = defineEmits<{
  confirmSize: [data: number];
}>();

const onChangeValue = () => {
  const calibratorBox = document.getElementById("calibrator-box");
  if (calibratorBox) {
    calibratorBox.style.width = rangeValue.value + "px";
    calibratorBox.style.height = rangeValue.value / 1.586 + "px";
  }
};

const confirm = () => {
  emits("confirmSize", rangeValue.value / 85.6); //85.6 mm adalah ukuran asli kartu debit
};
</script>

<template>
  <div
    class="flex flex-col p-6 items-center justify-center gap-5 bg-gray-50 h-screen w-full fixed z-10 max-w-[570px]"
  >
    <div class="flex-1 flex items-center flex-col">
      <div
        id="calibrator-box"
        class="bg-gray-700/50 flex flex-col items-center justify-center rounded-md border-[3px] border-dashed border-black text-white"
      >
        Letakkan kartu di sini
      </div>
    </div>

    <form
      @submit.prevent="confirm"
      class="flex flex-col items-center gap-5 h-[30%]"
    >
      <p class="text-center text-sm">
        Untuk kalibrasi layar, letakkan kartu ATM atau KTP pada kotak di atas
        dan geser slide di bawah hingga ukuran kotak menyesuaikan kartu. Apabila
        terpotong, cukup sesuaikan tinggi kartu saja.
      </p>
      <div class="w-full">
        <input
          type="range"
          class="w-full"
          v-model="rangeValue"
          max="1500"
          min="50"
          @input="onChangeValue"
        />
      </div>
      <MainButton label="Konfirmasi" size="small" />
    </form>
  </div>
</template>

<style scoped>
#calibrator-box {
  width: 400px;
  height: 200px;
}
</style>
