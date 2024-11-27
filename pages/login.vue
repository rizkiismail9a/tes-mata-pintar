<script setup lang="ts">
import { Form } from "vee-validate";
import InputForm from "~/components/common/InputForm.vue";
import MainButton from "~/components/common/MainButton.vue";

const username = ref<string>("");
const email = ref<string>("");
</script>

<template>
  <CommonNavbar page="Masuk" />
  <div
    class="py-[70px] px-4 flex flex-col gap-10 justify-center h-screen overflow-y-auto"
  >
    <div class="bg-white p-5 flex flex-col gap-4 rounded shadow">
      <img
        src="/illustration/flag.png"
        alt="flag"
        title="image by Fuzzy Friend on blush design"
        class="w-[100px] m-auto"
      />
      <h1 class="font-bold text-3xl">Masuk</h1>
      <p>Masuk supaya perhatian kami maksimal buat kamu</p>
      <Form class="flex flex-col gap-4" v-slot="{ errors }">
        <InputForm
          name="username"
          placeholder="Masukkan username kamu"
          label="Username"
          input-type="text"
          :error-input="errors"
          v-model="username"
          rules="required:username"
        />
        <InputForm
          name="password"
          placeholder="Masukkan kata sandi"
          label="Kata sandi"
          input-type="password"
          :error-input="errors"
          v-model="email"
          rules="required:password"
        />
        <div>
          <p>
            Belum punya akun? Yuk,
            <NuxtLink to="/register" class="hover:underline">
              registrasi &rightarrow;
            </NuxtLink>
          </p>
        </div>
        <MainButton label="Masuk" size="medium" />
      </Form>
    </div>
  </div>
</template>

<style scoped></style>
