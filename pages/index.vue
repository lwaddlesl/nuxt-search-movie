<template>
  <div>
    <Header />
    <Movies />
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
    this.getMovies();
  },

  methods: {
    ...mapActions(["getMovies", "searchMovies"]),
  },
};
</script>

