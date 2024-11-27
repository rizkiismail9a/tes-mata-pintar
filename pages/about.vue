<script setup lang="ts">
import {
  get,
  ref as fbRef,
  orderByChild,
  equalTo,
  query,
} from "firebase/database";

const { $firebaseDB } = useNuxtApp();

onMounted(async () => {
  await testGetData();
});

const testGetData = async () => {
  try {
    const dbRef = fbRef($firebaseDB, "test-histories");
    const data = await get(
      query(dbRef, orderByChild("diagnose"), equalTo("normal"))
    );

    if (data.exists()) {
      console.log(data.val());
    } else {
      console.log("Data tidak tersedia");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <CommonNavbar page="Tentang Kami" />
  <div
    class="py-[70px] px-4 flex flex-col gap-10 items-center justify-center h-screen overflow-y-auto"
  >
    Ini halaman about
  </div>
  <CommonNavbarFooter />
</template>

<style scoped></style>
