<script setup lang="ts">
import MainButton from "../common/MainButton.vue";

const emits = defineEmits<{
  understood: [];
}>();

const instructions = ref<
  {
    image: string;
    message: string;
  }[]
>([
  {
    image: "distance.png",
    message:
      "Atur posisi duduk. Jaga jarak 50cm atau sekitar rentangan tangan dari layar ponsel kamu",
  },
  {
    image: "brightness.png",
    message: "Tingkatkan kecerahan layar bila perlu",
  },
  {
    image: "ask-for-help.png",
    message: "Bila perlu, mintalah bantuan orang lain untuk mengisi jawaban",
  },
]);
const activeInstruction = ref<number>(0);

const changePage = () => {
  activeInstruction.value++;
};

const understand = () => {
  emits("understood");
};
</script>

<template>
  <div
    class="flex items-center bg-gray-50 h-screen w-full fixed z-10 max-w-[570px]"
  >
    <div
      class="flex items-center flex-col px-4 py-20 justify-between h-full w-full"
    >
      <div class="flex items-center flex-col gap-3 justify-center flex-1">
        <img
          :src="`/instruction/${instructions[activeInstruction].image}`"
          alt="instruksi"
        />
        <p class="text-center">{{ instructions[activeInstruction].message }}</p>
      </div>
      <MainButton
        v-if="activeInstruction < 2"
        label="Selanjutnya"
        size="medium"
        @click.native="changePage"
      />
      <MainButton
        v-else
        label="Mengerti"
        size="medium"
        @click.native="understand"
      />
    </div>
  </div>
</template>

<style scoped></style>
