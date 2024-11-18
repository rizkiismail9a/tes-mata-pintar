<script setup lang="ts">
const icons = ref<{ icon: string; route: string; label: string }[]>([
  {
    icon: "icon/home.png",
    route: "/",
    label: "home",
  },
  {
    icon: "icon/test.png",
    route: "/",
    label: "test",
  },
  {
    icon: "icon/info.png",
    route: "/",
    label: "about",
  },
  {
    icon: "icon/user.png",
    route: "/",
    label: "user",
  },
]);
</script>

<template>
  <div
    class="bg-blue-100 w-full max-w-[570px] h-[70px] p-4 flex items-center justify-between shadow-md fixed bottom-0"
  >
    <NuxtLink
      :to="icon.route"
      v-for="icon in icons"
      :key="icon.label"
      class="flex flex-col gap-1 items-center"
    >
      <img class="w-6" :src="icon.icon" :alt="icon.label" />
      <span>{{ icon.label }}</span>
    </NuxtLink>
  </div>
</template>
