<template>
  <div>
    <v-main>
      <v-container>
        <div v-if="!search && !isMoviesLoading">
          <h1 class="text-center text-uppercase">
            {{ $store.state.selectFilter.replace("_", " ") }}
          </h1>
          <v-row>
            <Movie
              v-for="(movie, index) in movies"
              :key="index"
              :movie="movie"
            />
          </v-row>
        </div>

        <v-row v-else-if="search && !isMoviesLoading">
          <Movie
            v-for="(movie, index) in searchedMovies"
            :key="index"
            :movie="movie"
          />
        </v-row>

        <div class="mt-16" v-else-if="isMoviesLoading">
          <Loading />
        </div>

        <v-pagination
          v-if="!isMoviesLoading && maxPages > 1"
          v-model="curPage"
          :length="maxPages"
          :total-visible="9"
          circle
          @input="next"
        ></v-pagination>
      </v-container>
    </v-main>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState([
      "movies",
      "search",
      "searchedMovies",
      "curPage",
      "maxPages",
      "isMoviesLoading",
    ]),
  },
  mounted() {
    if (this.$route.query.p) {
      this.page = Number(this.$route.query.p);
    } else {
      this.page = 1;
    }
    this.getMovies();
  },

  methods: {
    ...mapActions(["getMovies"]),
    next(page) {
      this.$store.commit("setPage", page);
      this.getMovies();
      this.$router.push({
        path: this.$route.fullPath,
        query: { p: this.curPage },
      });
    },
  },
};
</script>
<style scoped>
</style>