<script setup lang="ts">
import "cropperjs/dist/cropper.css";
import VueCropper from "vue-cropperjs";
import MainButton from "../common/MainButton.vue";

const props = defineProps<{
  image?: File; // Must be file reader result
}>();

const emit = defineEmits<{
  cropImage: [data: string];
}>();

const myCropper = useTemplateRef("cropper");
const imageSrc = ref<string>();

onMounted(() => {
  readFile();
});

const readFile = () => {
  if (!props.image) {
    return;
  }

  const reader = new FileReader();

  reader.onload = async (event) => {
    imageSrc.value = event.target?.result as string;

    await nextTick();
    // @ts-ignore  just ignore ts here, gak tahu. Dia gak nemu fungsi replace; Padahal ada
    myCropper.value?.replace(event.target?.result as string);
  };

  reader.readAsDataURL(props.image);
};

const cropHandler = () => {
  // @ts-ignore  just ignore ts here, gak tahu. Dia gak nemu fungsi replace; Padahal ada
  const result = myCropper.value?.getCroppedCanvas().toDataURL();
  emit("cropImage", result);
};
</script>

<template>
  <div
    class="fixed w-full h-screen bg-black flex flex-col p-10 items-center justify-between max-w-[570px] z-[100]"
  >
    <section id="cropper">
      <vue-cropper
        ref="cropper"
        :aspect-ratio="1"
        :src="imageSrc"
        :view-mode="1"
        style="width: 300px; height: 500px"
        :scalable="false"
      />
    </section>
    <MainButton label="Unggah Foto" size="medium" @click.native="cropHandler" />
  </div>
</template>

<style scoped></style>
