<script setup lang="ts">
defineProps<{
  page: string;
}>();
</script>

<template>
  <div
    class="w-full max-w-[570px] h-[50px] p-4 flex items-center justify-between shadow-md fixed z-50 bg-white"
  >
    <NuxtLink to="/" class="h-[40px]">
      <img
        src="/icon/logo-tmp.png"
        alt="logo tes mata pintar"
        class="h-full object-contain"
      />
    </NuxtLink>
    <div class="text-[14px]">{{ page }}</div>
  </div>
</template>
