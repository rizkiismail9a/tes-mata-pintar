<script setup lang="ts">
import { Form } from "vee-validate";
import { ref as firebaseRef, set } from "firebase/database";
import InputForm from "~/components/common/InputForm.vue";
import MainButton from "~/components/common/MainButton.vue";

definePageMeta({
  middleware: "auth",
});

const { registration } = useFirebaseAuth();
const { $firebaseDB } = useNuxtApp();
const router = useRouter();

const name = ref<string>("");
const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const passwordConfirm = ref<string>("");

const register = async () => {
  try {
    const data = await registration(
      email.value,
      password.value,
      name.value,
      username.value
    );

    if (data) {
      const dbRef = firebaseRef($firebaseDB, `/users/${data.user.uid}`);
      await set(dbRef, {
        fullName: name.value,
        email: email.value,
        username: username.value,
      });
    }

    router.push("/profile");
  } catch (error) {
    console.error("error registration", error);
  }
};
</script>

<template>
  <CommonNavbar page="Daftar" />
  <div
    class="py-[70px] px-4 flex flex-col gap-10 justify-center h-screen overflow-y-auto"
  >
    <div
      class="bg-white p-5 flex flex-col gap-4 rounded shadow max-h-[80vh] overflow-auto border-y-[16px] border-x-0 border-white"
    >
      <img
        src="/illustration/fish.png"
        alt="flag"
        title="image by Fuzzy Friend on blush design"
        class="w-[100px] m-auto"
      />
      <h1 class="font-bold text-3xl">Daftar</h1>
      <p>Daftar, yuk! Supaya kita bisa saling kenal</p>
      <Form class="flex flex-col gap-4" v-slot="{ errors }" @submit="register">
        <InputForm
          name="name"
          placeholder="Masukkan nama kamu"
          label="Nama Lengkap"
          input-type="text"
          :error-input="errors"
          v-model="name"
          rules="required:nama|min:4, nama"
        />
        <InputForm
          name="username"
          placeholder="Buat username baru"
          label="Username"
          input-type="text"
          :error-input="errors"
          v-model="username"
          rules="required:username|min:6, usename"
        />
        <InputForm
          name="email"
          placeholder="Masukkan email kamu"
          label="Email"
          input-type="email"
          :error-input="errors"
          v-model="email"
          rules="required:email|email"
        />
        <InputForm
          name="password"
          placeholder="Buat kata sandi baru"
          label="Kata Sandi"
          input-type="password"
          :error-input="errors"
          v-model="password"
          rules="required:kata sandi|min:6, kata sandi"
        />
        <InputForm
          name="confirmPass"
          placeholder="Masukkan ulang kata sandi kamu"
          label="Konfirmasi Kata Sandi"
          input-type="password"
          :error-input="errors"
          v-model="passwordConfirm"
          :rules="`required:kata sandi|min:6, kata sandi|confirmPass:${password}`"
        />
        <div>
          <p>
            Sudah punya akun? Yuk,
            <NuxtLink to="/login" class="hover:underline">
              masuk &rightarrow;
            </NuxtLink>
          </p>
        </div>
        <MainButton label="Daftar" size="medium" />
      </Form>
    </div>
  </div>
</template>

<style scoped></style>
