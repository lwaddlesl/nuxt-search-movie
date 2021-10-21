<template>
  <div>
    <v-app-bar app flat>
      <v-btn @click="clear2" class="mx-2" fab dark small color="primary">
        <v-icon dark> mdi-home </v-icon>
      </v-btn>
      <v-btn
        :color="$store.state.selectFilter == 'popular' ? 'red' : 'primary'"
        @click="filter('popular')"
        class="mx-2"
        >Popular</v-btn
      >
      <v-btn
        :color="$store.state.selectFilter == 'top_rated' ? 'red' : 'primary'"
        @click="filter('top_rated')"
        class="mx-2"
        >Top rated</v-btn
      >
      <v-btn
        :color="$store.state.selectFilter == 'upcoming' ? 'red' : 'primary'"
        @click="filter('upcoming')"
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
    ...mapMutations(["clear"]),
    clear2() {
      this.clear();
      this.$router.push({ path: "/" });
      this.getMovies();
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