<template>
  <div>
    <v-main>
      <v-container>
        <div v-if="!search && !$store.state.isMoviesLoading">
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

        <v-row v-else-if="search && !$store.state.isMoviesLoading">
          <Movie
            v-for="(movie, index) in searchedMovies"
            :key="index"
            :movie="movie"
          />
        </v-row>

        <div class="mt-16" v-else-if="$store.state.isMoviesLoading">
          <Loading />
        </div>

        <v-pagination
          v-if="!$store.state.isMoviesLoading && $store.state.maxPages > 1"
          v-model="page"
          :length="this.$store.state.maxPages"
          :total-visible="9"
          circle
        ></v-pagination>
      </v-container>
    </v-main>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["movies", "search", "searchedMovies"]),
  },
  data() {
    return {
      page: 1,
    };
  },
  watch: {
    page: function () {
      this.$store.commit("setPage", this.page);
      this.getMovies();
      this.$router.push({
        path: this.$route.fullPath,
        query: { p: this.$store.state.curPage },
      });
    },
  },
  mounted() {
    if (this.$route.query.p) {
      this.page = Number(this.$route.query.p);
    }
    this.getMovies();
  },

  methods: {
    ...mapActions(["getMovies"]),
  },
};
</script>
<style scoped>
</style>