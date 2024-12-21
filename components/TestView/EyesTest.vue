<script setup lang="ts">
import { TestServices } from "~/services/test.services";
import type { BlindTest, SightTest } from "~/types/eyeTest.type";
import LoadingState from "../common/LoadingState.vue";
import MainButton from "../common/MainButton.vue";
import CoverEyesInfo from "./CoverEyesInfo.vue";
import ScreenCalibrator from "./ScreenCalibrator.vue";
import TestIntsruction from "./TestIntsruction.vue";
import TestResult from "./TestResult.vue";

type TestAnswers = { label: string | number; value: string };

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
const colorBlindQuestions = ref<BlindTest[]>([]);
const sightEyeTestQuestions = ref<SightTest[]>([]);
const isLoading = ref<boolean>();
const subMessage = ref<string>("buta warna");
const buttonText = ref<"Kembali ke Beranda" | "Lanjut Mata Kanan">(
  "Kembali ke Beranda"
);

// For shuffle the anwser and question
const shuffle = (array: TestAnswers[] | BlindTest[] | SightTest[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Get the questions from store or from API
const getColorBlindQuestions = () => {
  const questions = eyeTestStore.colorBlindTesQuestions;
  return shuffle(questions);
};

const getSightTestQuestions = async () => {
  try {
    isLoading.value = true;
    const today = new Date().getDate();
    const isEven = today % 2 === 0;
    const { data } = await TestServices.fetchSightTestData(isEven ? 2 : 1);

    const questions = data;

    return shuffle(questions);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Di nuxt 3 dengan composition API, gak ada fetch dan created lagi
if (props.testType === "color-blind") {
  colorBlindQuestions.value = getColorBlindQuestions() as BlindTest[];
} else {
  sightEyeTestQuestions.value = (await getSightTestQuestions()) as SightTest[];
}

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

const chooseSnellenAnswer = async (value: string) => {
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

      // Shuffle the questiosn again
      sightEyeTestQuestions.value =
        (await getSightTestQuestions()) as SightTest[];
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
  <LoadingState v-if="isLoading" />

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
    :test-type="testType"
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
          v-for="answer in shuffle(colorBlindQuestions[activeQuestion].options)"
          :key="(answer as TestAnswers).label"
          :label="(answer as TestAnswers).label.toString()"
          size="test"
          @click.native="chooseIshiharaAnswer((answer as TestAnswers).value)"
        />
      </template>
      <template v-else>
        <MainButton
          v-for="answer in shuffle(
            sightEyeTestQuestions[activeQuestion].options
          )"
          :key="(answer as TestAnswers).label"
          :label="(answer as TestAnswers).label"
          size="test"
          @click.native="chooseSnellenAnswer((answer as TestAnswers).value)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
