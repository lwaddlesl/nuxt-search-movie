<template>
  <div>
    <Header v-if="!$store.state.isMoviesLoading" />
    <Movies />
    <Footer v-if="!$store.state.isMoviesLoading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    if (this.$route.query.q) {
      this.$store.commit("getSearch", this.$route.query.q);
      this.searchMovies();
    }
    if (this.$route.query.p) {
      this.$store.commit("setPage", this.$route.query.p);
    }
    if (this.$route.query.filter) {
      this.$store.commit("setSelectFilter", this.$route.query.filter);
    }
    this.getMovies();
  },

  methods: {
    ...mapActions(["getMovies", "searchMovies"]),
  },
};
</script>

