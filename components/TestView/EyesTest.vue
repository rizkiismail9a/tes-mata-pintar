<script setup lang="ts">
import MainButton from "../common/MainButton.vue";
import CoverEyesInfo from "./CoverEyesInfo.vue";
import ScreenCalibrator from "./ScreenCalibrator.vue";
import TestIntsruction from "./TestIntsruction.vue";
import TestResult from "./TestResult.vue";

const eyeTestStore = useEyeTestStore();
const { $cookies } = useNuxtApp();
const token = $cookies.getCookies("accessToken");
const props = defineProps<{ testType: string }>(); //"color-blind" | "sight-test"

const calibrationFactor = ref<number>(0.5);
const activeQuestion = ref<number>(0);
const answers = ref<string[]>([]);
const showIntsruction = ref<boolean>(true);
const showEyesCoverInstruction = ref<boolean>(false);
const showResult = ref<boolean>(false);
const showCalibrator = ref<boolean>(false);
const sightTestRound = ref<number>(1);
const subMessage = ref<string>("buta warna");
const buttonText = ref<"Kembali ke Beranda" | "Lanjut Mata Kanan">(
  "Kembali ke Beranda"
);

const colorBlindQuestions = computed(() => {
  return eyeTestStore.colorBlindTesQuestions;
});

const sightEyeTestQuestions = computed(() => {
  return eyeTestStore.sightEyeTest;
});

const testResult = computed(() => {
  return answers.value.every((item) => {
    return item === "normal";
  });
});

const understoodIntstruction = () => {
  if (props.testType === "color-blind") {
    showIntsruction.value = false;
  } else {
    showIntsruction.value = false;
    showCalibrator.value = true;
  }
};

const chooseIshiharaAnswer = (value: string) => {
  answers.value?.push(value);

  if (activeQuestion.value !== colorBlindQuestions.value.length - 1) {
    activeQuestion.value++;
  } else {
    showResult.value = true;
    subMessage.value = "buta warna";
  }
};

const chooseSnellenAnswer = (value: string) => {
  answers.value?.push(value);

  if (activeQuestion.value !== sightEyeTestQuestions.value.length - 1) {
    activeQuestion.value++;
  } else {
    if (sightTestRound.value === 1) {
      buttonText.value = "Lanjut Mata Kanan";
      showResult.value = true;
      subMessage.value = "gangguan mata kiri kamu";

      if (token) {
        localStorage.setItem("leftEyeResult", JSON.stringify(testResult.value));
      }
    } else {
      buttonText.value = "Kembali ke Beranda";
      subMessage.value = "gangguan mata kanan kamu";
      showResult.value = true;

      if (token) {
        localStorage.setItem(
          "rightEyeResult",
          JSON.stringify(testResult.value)
        );
      }
    }
  }
};

const confirmCalibratorFactor = (event: number) => {
  showEyesCoverInstruction.value = true;
  calibrationFactor.value = event;
  showCalibrator.value = false;
};

const onReadyRightEye = () => {
  showResult.value = false;
  showEyesCoverInstruction.value = true;
  answers.value = [];
  activeQuestion.value = 0;
  sightTestRound.value = 2;
};
</script>

<template>
  <TestIntsruction
    v-if="showIntsruction"
    @understood="understoodIntstruction"
  />

  <ScreenCalibrator
    v-if="showCalibrator"
    @confirm-size="confirmCalibratorFactor"
  />

  <TestResult
    v-if="showResult"
    :condition="testResult ? 'normal' : 'abnormal'"
    :sub-message="subMessage"
    :button-text="buttonText"
    @ready-right-eye="onReadyRightEye"
  />

  <CoverEyesInfo
    v-if="showEyesCoverInstruction"
    :cover-right="sightTestRound === 1"
    :cover-left="sightTestRound === 2"
    @start="showEyesCoverInstruction = false"
  />
  <div
    class="flex flex-col justify-between h-screen p-4 py-16 items-center w-full"
  >
    <img
      v-if="testType === 'color-blind'"
      :src="`/color-blind/${colorBlindQuestions[activeQuestion].image}`"
      alt="ishihara test"
    />
    <p
      v-if="testType === 'sight-test'"
      id="snellen-question"
      :style="{
        fontSize:
          sightEyeTestQuestions[activeQuestion].size * calibrationFactor + 'mm',
      }"
    >
      {{ sightEyeTestQuestions[activeQuestion].letters }}
    </p>
    <div class="grid grid-cols-1 gap-1">
      <p class="text-center text-xl">Apa yang kamu lihat?</p>
      <template v-if="testType === 'color-blind'">
        <MainButton
          v-for="answer in colorBlindQuestions[activeQuestion].options"
          :key="answer.label"
          :label="answer.label.toString()"
          size="test"
          @click.native="chooseIshiharaAnswer(answer.value)"
        />
      </template>
      <template v-else>
        <MainButton
          v-for="answer in sightEyeTestQuestions[activeQuestion].options"
          :key="answer.label"
          :label="answer.label"
          size="test"
          @click.native="chooseSnellenAnswer(answer.value)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
