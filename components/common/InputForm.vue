<script setup lang="ts">
import { ErrorMessage, Field, useField } from "vee-validate";

const props = defineProps<{
  label: string;
  inputType: "text" | "password" | "email";
  placeholder?: string;
  name: string;
  errorInput: any;
  modelValue: string;
  rules: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const { meta, value } = useField(props.name);

const onInput = (e: InputEvent) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<template>
  <label :for="name" class="flex flex-col gap-2">
    <span>{{ label }}</span>
    <div
      :class="`border-[2px] p-2 bg-gray-50 rounded focus-within:border-tosca border-gray-300 ${
        errorInput[name] ? '!border-red-500' : ''
      }${!errorInput[name] && value ? 'border-tosca' : ''}`"
    >
      <Field
        :name="name"
        :id="name"
        :type="inputType"
        class="border-none bg-transparent focus:ring-0 focus:outline-none w-full"
        :placeholder="placeholder"
        :rules="rules"
        @input="onInput"
        :value="modelValue"
        validate-on-input
        autocomplete="off"
      />
    </div>
    <ErrorMessage :name="name" class="text-red-600" />
  </label>
</template>

<style scoped></style>
