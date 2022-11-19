import { defineStore } from "pinia";
import axios from 'axios';

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
    async fetchNames() {
      const pageNumber = Math.floor(Math.random() * 66)
      const response = await axios.get(`http://stapi.co/api/v1/rest/character/search?pageSize=100&pageNumber=${pageNumber}`)
      this.names = response.data.characters.map(c => c.name);
    },
    async fetchImageSrcs() {
      const response = await axios.get('https://akabab.github.io/starwars-api/api/all.json');
      this.imageSrcs = response.data.map(d => d.image);
    },
  }
});
