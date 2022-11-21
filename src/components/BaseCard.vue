<template>
  <v-container class="mt-12">
    <v-row justify="space-around">
      <v-card width="600" :height="props.cardHeight">
        <v-img
          height="400"
          :src="props.imgSrc"
          cover
          class="text-white"
          @click="$emit('imageClick')"
        >
          <v-toolbar
            color="rgba(0, 0, 0, 0)"
            theme="dark"
          >
            <v-toolbar-title class="text-h6 text-yellow tb-title">
              {{ props.toolbarTitle }}
            </v-toolbar-title>
          </v-toolbar>
        </v-img>
        <v-card-title>
          {{ props.cardTitle }}
        </v-card-title>
        <v-card-subtitle>
          {{ props.cardSubtitle }}
        </v-card-subtitle>
        <slot name="card-actions"></slot>
        <v-card-text
          class="pt-0 text-caption font-weight-thin"
        >
          Image not appearing? Try clicking on it!
        </v-card-text>
        <v-expand-transition>
          <v-card
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%;"
            v-if="props.revealSubCard"
          >
            <v-col justify="space-around">
              <v-card-text class="pb-0">
                <p class="text-h4 text--primary">
                  {{ props.subcardTitle }}
                </p>
                <br>
                <p>{{ props.subcardText }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  variant="text"
                  color="error"
                  @click="$emit(props.subcardEventName)"
                >
                  {{ props.subcardButtonText }}
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  imgSrc: String,
  toolbarTitle: String,
  cardTitle: String,
  cardSubtitle: String,
  revealSubCard: Boolean,
  subcardTitle: String,
  subcardText: String,
  subcardButtonText: String,
  subcardEventName: String,
  cardHeight: String
});
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.tb-title {
  text-shadow: 2px 2px 4px #000000;
}
</style>
