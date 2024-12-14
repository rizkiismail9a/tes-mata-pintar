<script setup lang="ts">
defineProps<{
  coverLeft?: Boolean;
  coverRight?: Boolean;
}>();

const emit = defineEmits<{
  start: [];
}>();
</script>

<template>
  <div
    class="flex flex-col p-6 items-center justify-center gap-5 bg-gray-50 h-screen w-full fixed z-10 max-w-[570px]"
  >
    <template v-if="coverRight">
      <div class="flex flex-col gap-2 items-center">
        <img src="/instruction/cover-right-eye.png" alt="cover eyes" />
        <p>
          Pertama, mari tes mata kiri kamu dengan menutup mata kanan dengan
          telapak tangan tanpa menekannya.
        </p>
      </div>
    </template>
    <template v-if="coverLeft">
      <div class="flex flex-col gap-2 items-center">
        <img src="/instruction/cover-left-eye.png" alt="cover eyes" />
        <p>
          Berikutnya, mari tes mata kanan kamu dengan menutup mata kiri dengan
          telapak tangan tanpa menekannya.
        </p>
      </div>
    </template>

    <CommonMainButton
      label="Mulai"
      size="medium"
      @click.native="emit('start')"
    />
  </div>
</template>

<style scoped></style>
