<script setup lang="ts">
import { Form } from "vee-validate";
import InputForm from "~/components/common/InputForm.vue";
import MainButton from "~/components/common/MainButton.vue";

import type { LoginResponse } from "~/types/login.type";

definePageMeta({
  middleware: "auth",
});

const { login } = useFirebaseAuth();

const router = useRouter();

const password = ref<string>("");
const email = ref<string>("");
const isError = ref<boolean>(false);

const signIn = async () => {
  try {
    const data = await login(email.value, password.value);

    await getUserProfile(
      data?.user.uid as string,
      (data as unknown as LoginResponse).user.accessToken
    );

    router.push("/profile");
  } catch (error) {
    isError.value = true;
  }
};
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
      <Form class="flex flex-col gap-4" v-slot="{ errors }" @submit="signIn">
        <InputForm
          name="email"
          placeholder="Masukkan email kamu"
          label="Email"
          input-type="text"
          :error-input="errors"
          v-model="email"
          rules="required:email|email"
        />
        <InputForm
          name="password"
          placeholder="Masukkan kata sandi"
          label="Kata sandi"
          input-type="password"
          :error-input="errors"
          v-model="password"
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
