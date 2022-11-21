<template>
  <BaseCard
    :imgSrc="imageSrc"
    toolbarTitle="WTAR SARS"
    cardTitle="Hello There"
    :cardSubtitle="`Your favorite ${randomChar} characters!`"
    :revealSubCard="reveal"
    subcardEventName="toggleWhat"
    subcardButtonText="wizard"
    subcardTitle="Who's That Space Person?"
    subcardText="It's a game. A matching game. May the Force live long and prosper."
    cardHeight="550"
    @toggleWhat="handleReveal"
    @imageClick="handleImageClick"
  >
    <template #card-actions>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="handleStartGame"
        >
          start game
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="handleReveal"
        >
          what is this?
        </v-btn>
      </v-card-actions>
    </template>
  </BaseCard>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';
import BaseCard from '../components/BaseCard.vue';
import { questionsStore } from '../stores/questions';

const store = questionsStore();

const imageSrc = ref(store.fetchImageSrc());
const randomChar = ref(store.fetchRandomMovieCharacter());

const reveal = ref(false);
const handleReveal = () => {
  reveal.value = !reveal.value
}

const handleStartGame = () => router.push({ name: 'game' });

const handleImageClick = () => {
  const nextImageSrc = store.fetchImageSrc()
  imageSrc.value = nextImageSrc
}

</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>