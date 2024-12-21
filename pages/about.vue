<script setup lang="ts">
import {
  equalTo,
  ref as fbRef,
  get,
  orderByChild,
  query,
} from "firebase/database";

const { $firebaseDB } = useNuxtApp();

const totalUsers = ref<number>(0);
const totalColorBlindTest = ref<number>(0);
const totalSightTest = ref<number>(0);

onMounted(async () => {
  totalUsers.value = await getUsersSize();
  await Promise.all([getColorBlindSize(), getSightTestSize()]);
});

const getColorBlindSize = async () => {
  try {
    const dbRef = fbRef($firebaseDB, "test-histories");
    const data = await get(
      query(dbRef, orderByChild("testType"), equalTo("color-blind"))
    );

    if (data.exists()) {
      totalColorBlindTest.value = data.size;
    } else {
      console.log("Data tidak tersedia");
    }
  } catch (error) {
    console.error("error get color blind size", error);
  }
};

const getSightTestSize = async () => {
  try {
    const dbRef = fbRef($firebaseDB, "test-histories");
    const data = await get(
      query(dbRef, orderByChild("testType"), equalTo("sight-test"))
    );

    if (data.exists()) {
      totalSightTest.value = data.size;
    } else {
      console.log("Data tidak tersedia");
    }
  } catch (error) {
    console.error("error get color blind size", error);
  }
};
</script>

<template>
  <CommonNavbar page="Tentang Kami" />
  <div
    class="pt-[70px] pb-[90px] px-4 flex flex-col gap-5 items-center justify-start h-screen overflow-y-auto"
  >
    <h1 class="w-full text-2xl font-bold">Tentang Kami</h1>
    <section class="flex flex-col gap-2">
      <h2 class="text-[18px] font-semibold">Apa itu Tes Mata Pintar?</h2>
      <p>
        Tes Mata Pintar merupakan sebuah aplikasi tes buta warna dan rabun mata.
        Bermula dari ide empat mahasiswa informatika Universitas Siber Asia
        untuk memenuhi tugas ICT Literacy dan kebutuhan akan hasil tes mata yang
        dapat dijangkau oleh masyarakat umum tanpa memandang kelas sosial.
        Dimana pada zaman sekarang, kesehatan mata sangat penting untuk
        persyaratan masuk kedalam dunia kerja. <br />Disini, kami menawarkan
        kemudahan yang mana hanya dalam satu aplikasi, pengguna dapat melakukan
        dua tes mata sekaligus dengan gratis tanpa pungutan biaya apapun.
      </p>
    </section>
    <section class="flex flex-col gap-2 w-full">
      <h2 class="text-[18px] font-semibold">Apa yang Kami Lakukan?</h2>
      <p>Aplikasi kami telah bersama-sama membantu:</p>
      <div class="active-user-data flex gap-4 justify-between">
        <div
          class="flex flex-col gap-1 items-center bg-tmp-green p-3 rounded-md flex-1"
        >
          <div class="font-bold text-white">
            {{ totalUsers || "loading..." }}
          </div>
          <span class="text-center">pengguna aktif</span>
        </div>
        <div
          class="flex flex-col gap-1 items-center bg-tmp-green p-3 rounded-md flex-1"
        >
          <div class="font-bold text-white">
            {{ totalSightTest || "loading..." }}
          </div>
          <span class="text-center">tes rabun</span>
        </div>
        <div
          class="flex flex-col gap-1 items-center bg-tmp-green p-3 rounded-md flex-1"
        >
          <div class="font-bold text-white">
            {{ totalColorBlindTest || "loading..." }}
          </div>
          <span class="text-center">tes buta warna</span>
        </div>
      </div>
    </section>
    <section class="flex flex-col gap-2 w-full">
      <h2 class="text-[18px] font-semibold">Hubungi Kami</h2>
      <p>
        Kami menghargai kritik dan saran dalam bentuk apapun. Segera kirim
        masukan kamu melalui:
      </p>
      <div class="flex gap-3 items-center">
        <a href="mailto:testmatapintar@gmail.com" target="_blank">
          <img src="/icon/gmail.png" alt="gmail" class="w-[30px]" />
        </a>
        <a href="https://www.youtube.com/@testmatapintar-b2o" target="_blank">
          <img src="/icon/youtube.png" alt="gmail" class="w-[30px]" />
        </a>
      </div>
    </section>
  </div>
  <CommonNavbarFooter />
</template>

<style scoped></style>
