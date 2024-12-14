<script setup lang="ts">
import MainButton from "../common/MainButton.vue";
import TestIntsruction from "./TestIntsruction.vue";
import TestResult from "./TestResult.vue";

const eyeTestStore = useEyeTestStore();

const props = defineProps<{ testType: string }>(); //"color-blind" | "sight-test"

const activeQuestion = ref<number>(0);
const answers = ref<string[]>([]);
const showIntsruction = ref<boolean>(true);
const showResult = ref<boolean>(false);

const colorBlindQuestions = computed(() => {
  // if (props.testType === "color-blind") {
  //   return eyeTestStore.colorBlindTesQuestions;
  // }
  return eyeTestStore.colorBlindTesQuestions;
});

const testResult = computed(() => {
  return answers.value.every((item) => {
    return item === "normal";
  });
});

const chooseAnswer = (value: string) => {
  answers.value?.push(value);

  if (activeQuestion.value !== colorBlindQuestions.value.length - 1) {
    activeQuestion.value++;
  } else {
    showResult.value = true;
  }
};
</script>

<template>
  <TestIntsruction
    v-if="showIntsruction"
    @understood="showIntsruction = !showIntsruction"
  />

  <TestResult
    v-if="showResult"
    :condition="testResult ? 'normal' : 'abnormal'"
  />

  <div
    class="flex flex-col justify-between h-screen p-4 py-16 items-center w-full"
  >
    <img
      :src="`/color-blind/${colorBlindQuestions[activeQuestion].image}`"
      alt="ishihara test"
    />
    <div class="grid grid-cols-1 gap-1">
      <p class="text-center">Apa yang kamu lihat?</p>
      <MainButton
        v-for="answer in colorBlindQuestions[activeQuestion].options"
        :key="answer.label"
        :label="answer.label.toString()"
        size="test"
        @click.native="chooseAnswer(answer.value)"
      />
    </div>
  </div>
</template>

<style scoped></style>
