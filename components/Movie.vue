<template>
  <v-col cols="4">
    <div v-if="movie.poster_path" class="movie">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card class="mx-auto" height="750" max-width="300">
            <img
              :src="`https://image.tmdb.org/t/p/w300/${movie.poster_path}`"
              :alt="movie.title"
            />

            <v-card-text>
              <h2 class="text-h6 primary--text">{{ movie.title }}</h2>
              {{ movie.overview.slice(0, 160) }}
              <span v-if="movie.overview.length > 159">.....</span>
            </v-card-text>

            <v-card-title>
              <span class="grey--text text--lighten-2 text-caption mr-2">
                ({{ movie.vote_average }})
              </span>
              <v-rating
                :value="movie.vote_average / 2"
                dense
                color="orange"
                background-color="orange"
                hover
                half-increments
                class="mr-2"
              ></v-rating>
              <div class="primary--text text-subtitle-2">
                {{ movie.vote_count }} Reviews
              </div>
            </v-card-title>

            <v-fade-transition>
              <v-overlay v-if="hover" absolute z-index="3">
                <v-btn
                  class="text-decoration-none"
                  :to="{
                    name: 'movie-movieid',
                    params: { movieid: movie.id },
                  }"
                  >See more info</v-btn
                >
              </v-overlay>
            </v-fade-transition>
          </v-card>
        </template>
      </v-hover>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>