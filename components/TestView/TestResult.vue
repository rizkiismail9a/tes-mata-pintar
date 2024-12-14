<script setup lang="ts">
import MainButton from "../common/MainButton.vue";

defineProps<{
  condition: "normal" | "abnormal";
}>();

const router = useRouter();

const state = ref({
  normal: {
    image: "outdoors.png",
    message: "Mengagumkan!",
    subMessage:
      "Hasil tes menunjukkan bahwa mata kamu normal. Kamu dapat menjawab semua soal dengan benar! Terima kasih telah melakukan tes bersama kami. Tetap jaga kesehatan mata kamu dengan baik :D",
  },
  abnormal: {
    image: "sweet-koala.png",
    message: "Mohon maaf",
    subMessage:
      "Hasil tes menunjukkan adanya indikasi buta warna. Jangan khawatir, ini bukanlah sesuatu yang perlu ditakuti. Kami sarankan untuk berkonsultasi segera dengan dokter mata terdekat untuk pemeriksaan lebih lanjut dan saran yang lebih mendalam.",
  },
});
</script>

<template>
  <div
    class="flex flex-col items-center bg-gray-50 h-screen w-full fixed z-10 max-w-[570px]"
  >
    <div class="w-full h-16 flex items-center p-5">
      <img
        src="/icon/close-icon.png"
        alt="close"
        class="w-7"
        @click="router.push('/')"
      />
    </div>
    <div
      class="flex items-center gap-4 flex-col px-4 py-20 justify-center h-full w-full"
    >
      <img
        :src="`/illustration/${state[condition].image}`"
        alt="test-result"
        class="w-[170px]"
      />
      <div class="text-center">
        <p class="font-bold">{{ state[condition].message }}</p>
        <p class="text-sm">
          {{ state[condition].subMessage }}
        </p>
      </div>
      <MainButton
        label="Kembali ke Beranda"
        size="small"
        @click.native="router.push('/')"
      />
    </div>
    <div class="flex gap-1 py-8 px-3 items-baseline">
      <img src="/icon/info(1).png" alt="info" class="w-[15px]" />
      <span class="text-sm">
        Perhatian! Hasil tes kami tidak bisa digunakan untuk menggantikan hasil
        diagnosa dokter mata. Untuk hasil lebih akurat dan resmi,
        berkonsultasilah ke dokter mata terdekat
      </span>
    </div>
  </div>
</template>

<style scoped></style>
