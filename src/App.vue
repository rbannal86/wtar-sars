<template>
  <v-app>
    <v-main>
      <router-view  v-if="loaded" />
      <v-progress-circular v-else />
    </v-main>
  </v-app>
</template>

<script setup>
import { questionsStore } from './stores/questions';
import { onMounted, ref } from 'vue';

const store = questionsStore();
const loaded = ref(false)

onMounted(async () => {
  await store.fetchImageSrcs();
  await store.fetchNames();
  loaded.value = true;
});
</script>

<style>
html {
  overflow-y: hidden !important;
}
.v-main {
  background-color: darkgrey;
}
</style>
