<template>
  <BaseCard
    :imgSrc="imageSrc"
    toolbarTitle="Game Over"
    cardTitle="Your Score:"
    :cardSubtitle="`You got ${store.currentScore} out of 10 correct!`"
    cardHeight="550"
    @imageClick="handleImageClick"
  >
    <template #card-actions>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="() => navigate('home')"
        >
          Home
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="() => navigate('game')"
        >
          New Game
        </v-btn>
      </v-card-actions>
    </template>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../components/BaseCard.vue';
import { ref } from 'vue';
import { questionsStore } from '../stores/questions';
import router from '../router';

const store = questionsStore();

const imageSrc = ref(store.getImageSrc)

const navigate = (name) => {
  store.currentRound = 1;
  store.currentScore = 0;
  router.push({ name });
}

const handleImageClick = () => {
  const nextImageSrc = store.fetchImageSrc()
  imageSrc.value = nextImageSrc
}

</script>

<style scoped>

</style>