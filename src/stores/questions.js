import { defineStore } from "pinia";
import axios from 'axios';
import { randMovieCharacter, randMovie } from '@ngneat/falso';

export const questionsStore = defineStore('questions', {
  state: () => ({
    names: [],
    imageSrcs: [],
    currentRound: 1,
    currentScore: 0
  }),
  getters: {
    getImageSrc() {
      const srcIdx = Math.floor(Math.random() * this.imageSrcs.length);
      return this.imageSrcs[srcIdx];
    },
    getNameSet() {
      const nameSet = []
      for (let i = 0; i < 4; i++) {
        const nameIdx = Math.floor(Math.random() * this.names.length)
        const [removedName] = this.names.splice(nameIdx, 1)
        nameSet.push(removedName)
      }
      return nameSet;
    }
  },
  actions: {
    fetchNameSet() {
      const nameSet = []
      for (let i = 0; i < 4; i++) {
        const nameIdx = Math.floor(Math.random() * this.names.length)
        const [removedName] = this.names.splice(nameIdx, 1)
        nameSet.push(removedName)
      }
      return nameSet;
    },
    fetchImageSrc() {
      const srcIdx = Math.floor(Math.random() * this.imageSrcs.length);
      return this.imageSrcs[srcIdx];
    },
    fetchRandomMovieCharacter() {
      return randMovie();
    },
    async fetchNames() {
      for (let i = 0; i <= 100; i++) {
        this.names.push(randMovieCharacter());
      }
    },
    async fetchImageSrcs() {
      const response = await axios.get('https://akabab.github.io/starwars-api/api/all.json');
      this.imageSrcs = response.data.map(d => d.image);
    },
  }
});
