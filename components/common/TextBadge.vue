<script setup lang="ts">
defineProps<{
  type: "success" | "danger";
  label: string;
}>();
</script>

<template>
  <div
    :class="`flex items-center justify-center rounded-md p-1 text-sm text-white ${type}`"
  >
    {{ label }}
  </div>
</template>

<style scoped>
.success {
  background-color: rgb(13, 196, 13);
}

.danger {
  background-color: red;
}
</style>
