<script setup lang="ts">
defineProps<{
  label: string | number;
  size: "small" | "medium" | "test";
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
      `${
        size === 'test'
          ? 'min-w-[100px] w-full text-xl min-h-[80px] h-fit'
          : undefined
      }`,
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
      `${
        size === 'test'
          ? 'min-w-[100px] w-full text-xl min-h-[80px] h-fit'
          : undefined
      }`,
    ]"
  >
    {{ label }}
  </button>
</template>

<style scoped></style>
