<template>
  <div>
    <div class="mt-2">
      <div v-if="loaded"><Loading /></div>
      <v-container v-else>
        <v-btn @click="clear">Home</v-btn>
        <div class="main d-flex mt-4">
          <div class="left">
            <div v-if="person.profile_path">
              <img
                class="main-img"
                :src="`https://image.tmdb.org/t/p/w400/${person.profile_path}`"
                :alt="person.title"
              />
            </div>
            <div v-else>
              <img
                width="400px"
                class="main-img"
                src="../../assets/img/not-found.png"
                :alt="person.title"
              />
            </div>
          </div>
          <div class="discription ml-6">
            <h1 class="text-center teal--text">
              {{ person.name }}
            </h1>
            <h3>About actor:</h3>
            <div class="discription__item">
              <span class="indigo--text">Birthday:</span>
              {{ person.birthday }}
            </div>
            <div class="discription__item">
              <span class="indigo--text">Place of birth:</span>
              {{ person.place_of_birth }}
            </div>
            <div class="discription__item">
              <span class="indigo--text">IMDB:</span>
              <a
                class="homepage"
                :href="`https://www.imdb.com/name/${person.imdb_id}`"
              >
                {{ `https://www.imdb.com/name/${person.imdb_id}` }}
              </a>
            </div>
            <div class="discription__item">
              <span class="indigo--text"> Gender:</span>
              <span v-if="person.gender == '2'">Male</span>
              <span v-else>Female</span>
            </div>
            <div class="discription__item">
              <span class="indigo--text">Biography:</span>
              {{ person.biography }}
            </div>
          </div>
        </div>
        <v-expansion-panels class="mt-6" focusable>
          <v-expansion-panel>
            <v-expansion-panel-header>Images</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <div v-for="(image, i) in images" :key="i">
                  <v-col>
                    <v-card>
                      <img
                        width="300px"
                        :src="`https://image.tmdb.org/t/p/w300/${image.file_path}`"
                        :alt="person.title"
                      />
                    </v-card>
                  </v-col>
                </div>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <h2 class="text-center">Movies</h2>
        <Carrusel :movies="movies.cast" />
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      person: "",
      movies: "",
      images: "",
      loaded: true,
    };
  },
  async fetch() {
    await this.getSingleperson();
    await this.getPersonMovies();
    await this.getImagesMovies();
  },
  head() {
    return {
      title: this.person.title,
    };
  },
  methods: {
    ...mapMutations({ c: "clear" }),
    clear() {
      this.c();
      this.$router.push({ path: "/" });
    },

    async getSingleperson() {
      const response = await axios({
        url: `/person/${this.$route.params.castid}`,
        baseURL: this.$store.state.URL,
        params: {
          api_key: this.$store.state.APIKEY,
          language: "en-US",
        },
      });
      this.person = response.data;
    },
    async getPersonMovies() {
      const response = await axios({
        url: `/person/${this.$route.params.castid}/movie_credits`,
        baseURL: this.$store.state.URL,
        params: {
          api_key: this.$store.state.APIKEY,
          language: "en-US",
        },
      });
      this.movies = response.data;
      this.loaded = false;
    },
    async getImagesMovies() {
      const response = await axios({
        url: `/person/${this.$route.params.castid}/images`,
        baseURL: this.$store.state.URL,
        params: {
          api_key: this.$store.state.APIKEY,
          language: "en-US",
        },
      });
      this.images = response.data.profiles;
    },
  },
};
</script>

<style>
@media screen and (max-width: 1000px) {
  .main {
    flex-direction: column;
  }
  .left {
    text-align: center;
  }
  .main-img {
    width: 300px;
  }
}
@media screen and (max-width: 600px) {
  .video-size {
    width: 400px;
    height: auto;
  }
}
@media screen and (max-width: 430px) {
  .video-size {
    width: 320px;
    height: auto;
  }
}
</style>