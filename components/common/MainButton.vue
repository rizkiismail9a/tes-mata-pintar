<script setup lang="ts">
defineProps<{
  label: string;
  size: "small" | "medium";
}>();
</script>

<template>
  <button
    :class="[
      'bg-tmp-green rounded p-3',
      `${size === 'small' ? 'w-[200px]' : undefined}`,
    ]"
  >
    {{ label }}
  </button>
</template>

<style scoped></style>
