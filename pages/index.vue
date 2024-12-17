<script setup lang="ts">
import SurveyDialog from "~/components/common/SurveyDialog.vue";

let scrollInterval: string | number | NodeJS.Timeout | null | undefined = null;

const funFacts = ref<{ title: string; value: string }[]>([
  {
    title: "Mata adalah organ tercepat dalam tubuh manusia",
    value:
      "Mata dapat mendeteksi cahaya dalam hitungan milidetik dan mengirimkan informasi ke otak hampir secara instan. Ini membuatnya menjadi salah satu organ paling responsif.",
  },
  {
    title: "Hanya 1/6 bagian mata yang terlihat dari luar",
    value:
      "Sebagian besar struktur mata, seperti lensa, retina, dan saraf optik, tersembunyi di dalam rongga mata. Yang terlihat dari luar hanyalah bagian kornea, pupil, dan iris.",
  },
  {
    title: "Mata dapat membedakan hingga 10 juta warna",
    value:
      "Mata manusia memiliki tiga jenis sel kerucut (cones) yang memungkinkan kita mengenali warna. Gabungan sinyal dari sel ini memungkinkan kita melihat jutaan warna yang berbeda.",
  },
  {
    title: "Sidik mata lebih unik daripada sidik jari",
    value:
      "Pola iris mata setiap orang benar-benar unik, bahkan pada anak kembar identik. Karena itu, teknologi pengenalan iris sering digunakan dalam keamanan tingkat tinggi.",
  },
  {
    title: "Mata manusia selalu fokus secara otomatis",
    value:
      "Mata manusia secara konstan menyesuaikan fokus untuk melihat objek pada jarak yang berbeda, proses ini disebut akomodasi. Bahkan ketika tidak sadar, mata terus bergerak untuk menangkap detail.",
  },
]);
const activeFactIndex = ref<number>(0);
const showSurvey = ref<boolean>(false);

onMounted(() => {
  const isFromTestPage = JSON.parse(
    sessionStorage.getItem("isAfterTest") ?? "false"
  );

  if (isFromTestPage) showSurvey.value = true;

  scrollInterval = setInterval(animateFacts, 6000);
});

onUnmounted(() => {
  clearInterval(scrollInterval as number);
});

const animateFacts = () => {
  const element = document.getElementById(`funfact-${activeFactIndex.value}`);

  if (!element) return;

  element?.scrollIntoView({ behavior: "smooth" });
  activeFactIndex.value++;

  if (activeFactIndex.value >= funFacts.value.length) {
    activeFactIndex.value = 0;
  }
};

const closeSurveyDialog = () => {
  sessionStorage.removeItem("isAfterTest");
  showSurvey.value = false;
};
</script>

<template>
  <CommonNavbar page="Beranda" />
  <SurveyDialog v-if="showSurvey" @close-dialog="closeSurveyDialog" />

  <div
    class="py-[70px] mb-10 px-4 flex flex-col gap-10 items-center justify-start h-screen overflow-y-auto"
  >
    <div class="flex flex-col gap-4 items-center justify-center">
      <h1 class="font-bold text-2xl">Tes Mata Pintar</h1>

      <h2 class="text-center text-sm">
        Mata sehat, hati senang, hidup semangat!
      </h2>
      <h2 class="text-center text-sm">
        Misi kami adalah ikut berkontribusi menjaga kesehatan mata masyarakat
        Indonesia melalui tekonologi yang dapat diakses semua kalangan
      </h2>
    </div>

    <!-- Button tes -->
    <div class="flex items-center justify-center font-semibold">
      <NuxtLink
        to="/eye-test"
        class="bg-tmp-green rounded-full h-[200px] w-[200px] flex items-center justify-center hover:bg-tmp-green-secondary shadow-xl hover:translate-y-1 hover:text-white"
      >
        Mulai Tes
      </NuxtLink>
    </div>

    <div
      class="flex flex-col py-3 gap-4 w-full max-w-[520px] flex-1 items-center"
    >
      <h3 class="font-bold">Tahukan kamu?</h3>
      <div
        class="flex w-full gap-5 overflow-x-auto scroll-smooth p-y-5 snap-x snap-mandatory"
      >
        <div
          v-for="(fact, index) in funFacts"
          :key="index"
          :id="`funfact-${index}`"
          class="italic min-w-full snap-center p-3 h-fit border border-tmp-green rounded-md bg-tmp-green-secondary/10"
        >
          <p class="font-bold">{{ fact.title }}</p>
          <p class="text-sm">{{ fact.value }}</p>
        </div>
      </div>
    </div>
  </div>
  <CommonNavbarFooter />
</template>
