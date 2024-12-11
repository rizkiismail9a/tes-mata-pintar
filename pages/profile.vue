<script setup lang="ts">
import { signOut } from "firebase/auth";
import { ref as firebaseRef, set } from "firebase/database";
import LoadingState from "~/components/common/LoadingState.vue";
import MainButton from "~/components/common/MainButton.vue";
import UploadImage from "~/components/Profile/UploadImage.vue";

definePageMeta({
  middleware: "auth",
});

// Jangan di-destructure
const authStore = useAuthStore();
const { $auth, $firebaseDB, $cookies } = useNuxtApp();
const router = useRouter();
const token = $cookies.getCookies("accessToken");
const userId = $cookies.getCookies("userId");

const isLoading = ref<boolean>(false);
const showCropper = ref<boolean>(false);
const imageSrc = ref<File>();

onMounted(async () => {
  if (!authStore.user) {
    isLoading.value = true;
    await getUserProfile(userId, token);
    isLoading.value = false;
  }
});

const logout = async () => {
  try {
    isLoading.value = true;
    await signOut($auth);

    const storedCookie = useCookie("accessToken");
    const storedUid = useCookie("userId");
    storedCookie.value = null;
    storedUid.value = null;

    authStore.clearUser();
    window.location.reload();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

/**
 *
 * @param event adalah base64 dari haril result cropper
 */
const cropImage = async (event: string) => {
  try {
    showCropper.value = false;
    isLoading.value = true;

    const userId = $cookies.getCookies("userId");

    const dbRef = firebaseRef($firebaseDB, `/users/${userId}`);

    authStore.updateProfilePicture(event);

    if (userId) {
      await set(dbRef, {
        fullName: authStore.user?.fullName,
        email: authStore.user?.email,
        username: authStore.user?.username,
        photoProfile: event,
      });
    }

    // window.location.reload();
  } catch (error) {
    console.error("error upload gambar", error);
  } finally {
    isLoading.value = false;
  }
};

const setImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target?.files;

  if (files?.length) {
    const file = files[0]; // Input image akan mengembalikan Blob
    imageSrc.value = file;
    // const reader = new FileReader();

    // reader.onload = (event) => {
    //   imageSrc.value = event.target?.result as string;
    // };

    // reader.readAsDataURL(file);
    showCropper.value = true;
  }
};
</script>

<template>
  <LoadingState v-if="isLoading" />
  <UploadImage v-if="showCropper" @crop-image="cropImage" :image="imageSrc" />
  <CommonNavbar page="Akun" />
  <div
    class="pt-[70px] pb-[90px] px-4 flex flex-col gap-10 items-center justify-center h-screen overflow-y-auto"
  >
    <div
      id="profile-content"
      v-if="!token"
      class="flex items-center flex-col gap-4"
    >
      <img
        src="/illustration/sweet-koala.png"
        alt="sweet koala"
        title="image by Fuzzy Friend on blush design"
        class="w-[200px]"
      />
      <p class="text-center">
        Masuk untuk dapat akses berbagai fitur menarik kami
      </p>
      <MainButton
        label="Masuk"
        size="small"
        @click.native="router.push('/login')"
      />
      <NuxtLink to="/login"> login </NuxtLink>
    </div>

    <div v-else class="flex justify-between h-full w-full flex-col gap-4">
      <div class="flex gap-4">
        <div
          id="profile-photo"
          class="flex w-fit items-center rounded-full justify-center border border-tmp-green relative"
        >
          <!-- {{ profilePicture }} -->
          <img
            v-if="!authStore.user?.photoProfile?.length"
            src="/public/icon/logo-tmp.png"
            alt="user-profile"
            class="w-[120px] h-[120px] object-contain"
          />
          <img
            v-else
            :src="authStore.user?.photoProfile"
            alt="user-profile"
            class="w-[120px] h-[120px] object-contain rounded-full"
          />

          <label
            for="input-photo"
            class="absolute right-1 bottom-1 bg-tmp-green-secondary p-2 rounded-full"
          >
            <img
              src="/icon/photo-camera-interface-symbol-for-button.png"
              alt="upload image"
              class="w-5 h-5"
            />
            <input
              id="input-photo"
              type="file"
              accept="image/png,image/jpg,image/jpeg"
              class="hidden"
              @change="setImage"
            />
          </label>
        </div>

        <div class="flex gap-2 justify-center flex-col py-5">
          <h3 class="font-semibold text-lg">{{ authStore.user?.fullName }}</h3>
          <div class="text-sm">{{ authStore.user?.username }}</div>
        </div>
      </div>

      <div class="flex flex-col items-center gap-4">
        <img
          src="/illustration/sweet-koala.png"
          alt="sweet koala"
          title="image by Fuzzy Friend on blush design"
          class="w-[200px]"
        />
        <p class="text-center">Kamu belum ambil tes apapun</p>
      </div>

      <div
        @click="logout"
        class="flex items-center gap-3 border w-[100px] border-gray-950 p-2 rounded-md hover:bg-gray-300 mx-auto"
      >
        <img
          class="w-4 h-4"
          src="/icon/logout.png"
          alt="logout"
          title="icon by dmitri13"
        />
        <span>Keluar</span>
      </div>
    </div>
  </div>
  <CommonNavbarFooter />
</template>

<style scoped></style>
