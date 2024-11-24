<script setup lang="ts">
const icons = ref<{ icon: string; route: string; label: string }[]>([
  {
    icon: "icon/home.png",
    route: "/",
    label: "beranda",
  },
  {
    icon: "icon/test.png",
    route: "/eye-test",
    label: "tes",
  },
  {
    icon: "icon/info.png",
    route: "/about",
    label: "tentang",
  },
  {
    icon: "icon/user.png",
    route: "/profile",
    label: "profil",
  },
]);
</script>

<template>
  <div
    class="bg-tmp-green w-full max-w-[570px] h-[70px] p-4 flex items-center justify-between shadow-md fixed bottom-0"
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
