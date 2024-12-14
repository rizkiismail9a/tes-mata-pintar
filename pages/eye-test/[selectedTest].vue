<script setup lang="ts">
import EyesTest from "~/components/TestView/EyesTest.vue";

const route = useRoute();

onMounted(() => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
});
</script>

<template>
  <EyesTest :test-type="route.params.selectedTest as string" />
</template>

<style scoped></style>
