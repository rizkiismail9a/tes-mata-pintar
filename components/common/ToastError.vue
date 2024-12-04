<script setup lang="ts">
defineProps<{
  errorMessage: string;
}>();
</script>

<template>
  <div class="border border-red-600 text-red-600 p-3 bg-red-50 rounded-md">
    {{ errorMessage }}
  </div>
</template>

<style scoped></style>
