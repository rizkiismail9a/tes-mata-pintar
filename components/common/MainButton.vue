<script setup lang="ts">
defineProps<{
  label: string;
  size: "small" | "medium";
  textOnly?: boolean;
}>();
</script>

<template>
  <button
    v-if="!textOnly"
    :class="[
      'bg-tmp-green rounded p-3 hover:bg-tmp-green-secondary text-sm',
      `${size === 'small' ? 'w-[200px]' : undefined}`,
      `${size === 'medium' ? 'w-full' : undefined}`,
    ]"
  >
    {{ label }}
  </button>
  <button
    v-else
    :class="[
      'border-tmp-green border rounded p-3 hover:bg-tmp-green-secondary/10 text-sm',
      `${size === 'small' ? 'w-[200px]' : undefined}`,
      `${size === 'medium' ? 'w-full' : undefined}`,
    ]"
  >
    {{ label }}
  </button>
</template>

<style scoped></style>
