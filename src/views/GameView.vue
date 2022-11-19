<template>
  <BaseCard
    :key="`game-board-${store.currentRound}`"
    :imgSrc="imageSrc"
    :toolbarTitle="`ROUND ${store.currentRound}`"
    cardTitle="Who is this?"
    cardHeight="700"
    v-if="loaded"
    :revealSubCard="reveal"
    :subcardEventName="subcardEventName"
    :subcardButtonText="subcardButtonText"
    :subcardTitle="subcardTitle"
    :subcardText="subcardText"
    @nextRound="handleNextRound"
    @showResults="handleShowResults"
    @imageClick="handleImageClick"
  >
    <template #card-actions>
      <v-card-actions class="d-flex flex-column">
        <v-container class="d-flex flex-row pt-0">
          <v-radio-group v-model="selectedAnswer">
            <v-radio :label="nameSet[0]" value="1"></v-radio>
            <v-radio :label="nameSet[1]" value="2"></v-radio>
          </v-radio-group>
          <v-spacer></v-spacer>
          <v-radio-group v-model="selectedAnswer">
            <v-radio :label="nameSet[2]" value="3"></v-radio>
            <v-radio :label="nameSet[3]" value="4"></v-radio>
          </v-radio-group>
        </v-container>
        <v-btn
          color="primary"
          :disabled="!selectedAnswer"
          @click="handleAnswerSubmit"
        >
          Engage
        </v-btn>
      </v-card-actions>
    </template>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../components/BaseCard.vue';
import { ref, onMounted } from 'vue';
import { questionsStore } from '../stores/questions';
import router from '../router';

const store = questionsStore();

const imageSrc = ref(store.fetchImageSrc())
const loaded = ref(false)
const nameSet = ref([])
const selectedAnswer = ref(null)
const reveal = ref(false)
const subcardTitle = ref('')
const subcardText = ref('')
const subcardButtonText = ref('Next Round')
const subcardEventName = ref('nextRound')

onMounted(() => {
  nameSet.value = store.getNameSet
  loaded.value = true
});



const handleAnswerSubmit = () => {
  const answer = Math.ceil(Math.random() * 4).toString();
  if (answer === selectedAnswer.value) {
    subcardTitle.value = 'You know your Star Things!'
    subcardText.value = 'You jumped into hyper-warp!'
    store.currentScore++
  }
  else {
    subcardTitle.value = 'Dank Farrik!'
    subcardText.value = 'You\'ll get the next one!'
  }
  reveal.value = true
};

const handleNextRound = () => {
  store.currentRound++
  selectedAnswer.value = null
  reveal.value = false
  const nextNameSet = store.fetchNameSet()
  const nextImageSrc = store.fetchImageSrc()
  nameSet.value = nextNameSet
  imageSrc.value = nextImageSrc
  if (store.currentRound === 10) {
    subcardButtonText.value = 'See Results'
    subcardEventName.value = 'showResults'
  }
}

const handleImageClick = () => {
  const nextImageSrc = store.fetchImageSrc()
  imageSrc.value = nextImageSrc
}

const handleShowResults = () => router.push({ name: 'results' });

</script>

<style scoped>

</style>