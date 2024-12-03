<script setup lang="ts">
const { $cookies } = useNuxtApp();
const authStore = useAuthStore();
const accessToken = authStore.user.accessToken;

onMounted(async () => {
  if (!accessToken) {
    const storedToken = $cookies.getCookies("accessToken");
    const userId = $cookies.getCookies("userId");

    if (storedToken && userId) {
      await getUserProfile(userId, storedToken);
    }
  }
});
</script>

<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
