<script setup lang="ts">
import {
  ref as firebaseRef,
  push,
  serverTimestamp,
  set,
} from "firebase/database";
import LoadingState from "../common/LoadingState.vue";
import MainButton from "../common/MainButton.vue";

const { $cookies, $firebaseDB } = useNuxtApp();

const props = defineProps<{
  condition: "normal" | "abnormal";
  subMessage: string;
  buttonText: "Kembali ke Beranda" | "Lanjut Mata Kanan";
  testType: string;
}>();

const emits = defineEmits<{
  readyRightEye: [];
}>();

const router = useRouter();

const isLoading = ref<boolean>(false);

const colorBlindState = ref({
  normal: {
    image: "outdoors.png",
    message: "Mengagumkan!",
  },
  abnormal: {
    image: "sweet-koala.png",
    message: "Mohon maaf",
  },
});

const submitTestResult = async () => {
  try {
    const userid = $cookies.getCookies("userId");
    if (props.testType === "color-blind") {
      const dbRef = firebaseRef($firebaseDB, `/test-histories/`);
      const newData = push(dbRef);

      await set(newData, {
        userId: userid ?? "",
        diagnose:
          props.condition === "normal" ? "normal" : "terindikasi buta warna",
        testedAt: serverTimestamp(),
        testType: props.testType,
      });
    }

    if (props.testType === "sight-test") {
      const leftEyeDiagnose = JSON.parse(
        localStorage.getItem("leftEyeResult") ?? ""
      );

      const rightEyeDiagnose = JSON.parse(
        localStorage.getItem("rightEyeResult") ?? ""
      ); // valuenya akan boolean

      const dbRef = firebaseRef($firebaseDB, `/test-histories/`);
      const newData = push(dbRef);

      await set(newData, {
        userId: userid ?? "",
        testType: props.testType,
        diagnose: {
          leftEye: leftEyeDiagnose ? "normal" : "terindikasi gangguan mata",
          rightEye: rightEyeDiagnose ? "normal" : "terindikasi gangguan mata",
        },
        testedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("error submit data test", error);
  }
};

const onButtonClick = async () => {
  try {
    isLoading.value = true;
    const token = $cookies.getCookies("accessToken");

    if (props.buttonText === "Kembali ke Beranda") {
      document.exitFullscreen();
      await submitTestResult();

      if (token) {
        router.push("/profile");
        return;
      }

      router.push("/");
    } else {
      emits("readyRightEye");
    }

    sessionStorage.setItem("isAfterTest", JSON.stringify(true));
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <LoadingState v-if="isLoading" />
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
        :src="`/illustration/${colorBlindState[condition].image}`"
        alt="test-result"
        class="w-[170px]"
        title="image by Fuzzy Friend on blush design"
      />
      <div class="text-center">
        <p class="font-bold">{{ colorBlindState[condition].message }}</p>
        <p class="text-sm" v-if="condition === 'normal'">
          Hasil tes menunjukkan bahwa mata kamu normal. Kamu dapat menjawab
          semua soal dengan benar! Terima kasih telah melakukan tes bersama
          kami. Tetap jaga kesehatan mata kamu dengan baik :D
        </p>
        <p class="text-sm" v-else>
          Hasil tes menunjukkan adanya indikasi {{ subMessage }}. Jangan
          khawatir, ini bukanlah sesuatu yang perlu ditakuti. Kami sarankan
          untuk berkonsultasi segera dengan dokter mata terdekat untuk
          pemeriksaan lebih lanjut dan saran yang lebih mendalam.
        </p>
      </div>
      <MainButton
        :label="buttonText"
        size="small"
        @click.native="onButtonClick"
      />
    </div>

    <div class="flex gap-1 py-8 px-3 items-baseline">
      <img src="/icon/info(1).png" alt="info" class="w-[15px]" />
      <span class="text-sm font-bold">
        Perhatian! Hasil tes kami tidak bisa digunakan untuk menggantikan hasil
        diagnosa dokter mata. Untuk hasil lebih akurat dan resmi,
        berkonsultasilah ke dokter mata terdekat
      </span>
    </div>
  </div>
</template>

<style scoped></style>
