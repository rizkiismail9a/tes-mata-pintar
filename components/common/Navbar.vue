<script setup lang="ts">
defineProps<{
  page: string;
}>();
</script>

<template>
  <div
    class="bg-blue-100 w-full max-w-[570px] h-[50px] p-4 flex items-center justify-between shadow-md fixed"
  >
    <div>Ini Logo</div>
    <div>{{ page }}</div>
  </div>
</template>
