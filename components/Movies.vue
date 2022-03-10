<template>
  <main>
    <v-main>
      <v-container>
        <div v-if="!search && !isMoviesLoading">
          <v-select
            @change="filter(value)"
            class="select ma-6"
            v-model="value"
            :items="['top_rated', 'popular', 'upcoming']"
            attach
            label="Filter"
          ></v-select>
          <h1 class="text-center text-uppercase">
            {{ selectFilter.replace("_", " ") }}
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
          class="mt-4"
          v-if="!isMoviesLoading && maxPages > 1"
          :v-model="+curPage"
          :length="maxPages"
          :total-visible="9"
          circle
          @input="next"
        ></v-pagination>
      </v-container>
    </v-main>
  </main>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState([
      "movies",
      "search",
      "searchedMovies",
      "curPage",
      "maxPages",
      "selectFilter",
      "isMoviesLoading",
    ]),
  },
  data() {
    return {
      value: "",
    };
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
    ...mapMutations(["clear"]),

    next(page) {
      this.$store.commit("setPage", page);
      this.getMovies();
      this.$router.push({
        path: this.$route.fullPath,
        query: { p: this.curPage },
      });
    },
    filter(selected) {
      if (this.$store.state.selectFilter != selected) {
        this.$store.commit("setSelectFilter", selected);
        this.$router.push({
          query: { filter: this.$store.state.selectFilter },
        });
        this.clear();
        this.getMovies();
      } else {
        this.clear();
      }
    },
  },
};
</script>
<style scoped>
.select {
  display: none;
}
@media screen and (max-width: 760px) {
  .select {
    display: block;
  }
}
</style>