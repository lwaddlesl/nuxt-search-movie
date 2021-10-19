<template>
  <div>
    <v-app-bar app flat>
      <v-btn @click="clear" class="mx-2" fab dark small color="primary">
        <v-icon dark> mdi-home </v-icon>
      </v-btn>
      <v-btn
        color="primary"
        v-if="$store.state.selectFilter != 'popular'"
        @click="filterPopular"
        class="mx-2"
        >Popular</v-btn
      >
      <v-btn
        color="primary"
        v-if="$store.state.selectFilter != 'top_rated'"
        @click="filterTopRated"
        class="mx-2"
        >Top rated</v-btn
      >
      <v-btn
        color="primary"
        v-if="$store.state.selectFilter != 'upcoming'"
        @click="filterUpcoming"
        class="mx-2"
        >Upcoming</v-btn
      >
      <v-text-field
        :value="search"
        @keyup.enter="getSearch"
        label="Search movie...."
        hide-details="auto"
      ></v-text-field>
      <v-switch
        class="ml-6 mt-6"
        v-model="$vuetify.theme.dark"
        inset
        label=""
        persistent-hint
      ></v-switch>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      search: (state) => state.search,
    }),
  },
  methods: {
    ...mapActions(["searchMovies", "getMovies"]),
    ...mapMutations({ c: "clear" }),
    clear() {
      this.c();
      this.$router.push({ path: "/" });
      this.getMovies;
    },
    filterPopular() {
      if (this.$store.state.selectFilter != "popular") {
        this.c();
        this.$store.commit("setSelectFilter", "popular");
        this.$router.push({
          query: { filter: this.$store.state.selectFilter },
        });
        this.getMovies();
      }
    },
    filterTopRated() {
      if (this.$store.state.selectFilter != "top_rated") {
        this.c();
        this.$store.commit("setSelectFilter", "top_rated");
        this.$router.push({
          query: { filter: this.$store.state.selectFilter },
        });
        this.getMovies();
      }
    },
    filterUpcoming() {
      if (this.$store.state.selectFilter != "upcoming") {
        this.c();
        this.$store.commit("setSelectFilter", "upcoming");
        this.$router.push({
          query: { filter: this.$store.state.selectFilter },
        });
        this.getMovies();
      }
    },

    getSearch(e) {
      this.$store.commit("getSearch", e.target.value);
      this.searchMovies();
      this.$router.push({
        query: { q: e.target.value },
      });
    },
  },
};
</script>

<style>
</style>