<template>
  <div>
    <div class="mt-2">
      <div v-if="loaded"><Loading /></div>
      <v-container v-else>
        <v-btn @click="clear">Home</v-btn>
        <div class="main d-flex mt-4">
          <div class="left">
            <div v-if="movie.poster_path">
              <img
                class="main-img"
                :src="`https://image.tmdb.org/t/p/w400/${movie.poster_path}`"
                :alt="movie.title"
              />
            </div>
            <div v-else>
              <img
                width="400px"
                class="main-img"
                src="../../assets/img/not-found.png"
                :alt="movie.title"
              />
            </div>
          </div>
          <div class="discription ml-6">
            <h1 class="text-center teal--text">
              {{ movie.title }}
            </h1>
            <h3>About movie:</h3>
            <div class="discription__item">
              <span class="indigo--text">Genres:</span>
              <span v-for="(g, index) in genres" :key="index">
                <v-chip label class="mt-3 mr-3">{{ g }}</v-chip>
              </span>
            </div>

            <div class="discription__item">
              <span class="indigo--text">Production companies:</span>
              <span
                v-for="(c, index) in movie.production_companies"
                :key="index"
              >
                <v-chip label class="mt-3 mr-3">{{ c.name }}</v-chip>
              </span>
            </div>

            <div class="discription__item">
              <span class="indigo--text">Overview:</span>
              {{ movie.overview }}
            </div>
            <div v-if="movie.homepage" class="discription__item">
              <span class="indigo--text">Homepage:</span>
              <a class="homepage" :href="movie.homepage">
                {{ movie.homepage }}
              </a>
            </div>
            <div class="discription__item">
              <span class="indigo--text">Release date:</span>
              {{ movie.release_date }}
            </div>
            <div class="discription__item">
              <span class="indigo--text">budget:</span>
              {{
                movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}$
            </div>
            <div class="discription__item">
              <span class="indigo--text">revenue:</span>
              {{
                movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}$
            </div>
            <div class="discription__item">
              <span class="indigo--text">Runtime:</span>
              {{ movie.runtime }}
              min
            </div>
            <div class="discription__item">
              <span class="indigo--text">Vote average:</span>
              {{ movie.vote_average }}
            </div>
            <div v-if="movie.tagline" class="discription__item">
              <span class="indigo--text"> tagline:</span>
              {{ movie.tagline }}
            </div>
            <v-rating
              :value="movie.vote_average"
              dense
              color="orange"
              background-color="orange"
              hover
              half-increments
              readonly
              length="10"
              class="mr-2"
            ></v-rating>
            <div class="primary--text text-subtitle-2">
              {{ movie.vote_count }} Reviews
            </div>
          </div>
        </div>
        <div class="text-center mb-10">
          <v-btn class="mt-4 mr-8" @click="showVideo">Video</v-btn>
        </div>
        <div class="video d-none">
          <p class="headline">Videos:</p>
          <p class="caption grey--text">{{ videos.length }} items</p>

          <div v-for="(video, index) in videos" :key="index">
            <div class="text-center">
              <iframe
                class="video-size mt-6"
                width="560"
                height="315"
                :src="`https://www.youtube.com/embed/${video.key}`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>

        <h2 class="text-center">Similar movies</h2>
        <Carrusel :movies="similarMovies" />
        <h2 class="text-center mb-4">Recommendations</h2>
        <Carrusel :movies="recMovies" />
        <h2 class="text-center mb-4">Cast</h2>
        <CarruselCast :movies="cast" />
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  layout: "empty",
  data() {
    return {
      movie: "",
      genres: [],
      similarMovies: [],
      recMovies: [],
      videos: [],
      images: [],
      cast: [],
      loaded: true,
    };
  },
  async fetch() {
    await this.getSingleMovie();
    await this.getSimilarMovie();
    await this.getVideos();
    await this.getRecMovie();
    await this.getCast();
  },
  head() {
    return {
      title: this.movie.title,
    };
  },
  methods: {
    ...mapMutations({ c: "clear" }),
    clear() {
      this.c();
      this.$router.push({ path: "/" });
    },
    showVideo() {
      let video = document.querySelector(".video");
      video.classList.toggle("d-none");
    },

    showImage() {},

    async getSingleMovie() {
      this.loaded = true;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US`
      );
      this.movie = response.data;
      this.movie.genres.forEach((g) => this.genres.push(g.name));
    },
    // async getImages() {
    //   const response = await axios.get(
    //     `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}/images?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US`
    //   );
    //   this.images = response.data.results;
    //   this.loaded = false;
    // },
    async getCast() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}/credits?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US`
      );
      this.cast = response.data.cast;
      this.loaded = false;
    },
    async getVideos() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}/videos?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US`
      );
      this.videos = response.data.results;
    },
    async getSimilarMovie() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}/similar?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US`
      );
      this.similarMovies = response.data.results;
    },
    async getRecMovie() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}/recommendations?api_key=f1dfea0ae51d06d0af3e583914087e6c&language=en-US`
      );
      this.recMovies = response.data.results;
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