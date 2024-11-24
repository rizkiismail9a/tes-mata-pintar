<script setup lang="ts"></script>

<template>
  <CommonNavbar page="Home" />
  <div
    class="py-[70px] px-4 flex flex-col gap-10 items-center justify-center h-screen overflow-y-auto"
  >
    <div class="flex flex-col gap-4 items-center justify-center">
      <h1 class="font-bold text-4xl">Tes Mata Pintar</h1>
      <h2 class="text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus,
        aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Error, itaque.
      </h2>
    </div>

    <div>
      <p class="italic">Ini fakta unik</p>
    </div>

    <!-- Button tes -->
    <div class="flex items-center justify-center text-white font-semibold">
      <button
        class="bg-tmp-green rounded-full h-[200px] w-[200px] flex items-center justify-center text-xl"
      >
        <NuxtLink to="/eye-test"> Mulai Tes </NuxtLink>
      </button>
    </div>
  </div>
  <CommonNavbarFooter />
</template>
