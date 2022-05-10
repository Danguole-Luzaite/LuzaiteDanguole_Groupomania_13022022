<template>
  <v-container id="ThePost" fluid class="mb-5">
    <v-card app max-width="900" max-height="750" class="mx-auto mb-4" outlined elevation="2" v-for="post in posts.slice().reverse()" :key="post.postId">
      <v-row >
        <v-avatar size="44" class="ml-2 mt-1">
          <v-img v-bind:src="post.User.userAvatar" alt="image de profil"/>
        </v-avatar>
        <v-card-subtitle>{{ post.User.firstName }} {{ post.User.lastName }}</v-card-subtitle>
        <v-spacer></v-spacer>
        <v-card-actions>
          <!-- dialog composant pour editer le post créé -->
          <update-post :post="post"/>
          <!-- dialog composant pour supprimer le post créé -->
          <delete-post :postId="post.postId"/>
        </v-card-actions>
      </v-row>
      <v-divider></v-divider>

      <v-card-text>
        <!-- place pour postTitle-->
        <v-card-title>{{ post.postTitle }}</v-card-title>
        <!-- place pour postMessage-->
        <v-card-text>{{ post.postMessage }}</v-card-text>
        <!-- place pour postImage-->
        <v-img contain max-height="200" v-bind:src="post.postImage" alt="image de post"/>
      </v-card-text>
      <v-divider class="mb-2"></v-divider>
      <!-- button icons pour aimer le post et postuler un comment-->
      <v-card-actions>
        <!-- aimer le post -->
        <v-btn icon elevation="1" class="mx-2" color="deep-orange">
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>

        <!-- postuler un comment-->
        <create-comment :post="post"/>
      </v-card-actions>
      <!-- afficher les comments-->
      <the-comment  :postId="post.postId" />

    </v-card>
  </v-container>
</template>

<script>
import CreateComment from '../components/CreateComment.vue';
import UpdatePost from '../components/UpdatePost.vue';
import DeletePost from '../components/DeletePost.vue';
import TheComment from '../components/TheComment.vue';

// Axios
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});


export default {
  name: 'ThePost',

  data () {
    return {
      posts: [{
        postTitle: '',
        postMessage: '',
        postImage: '',
      }],
      postId: 0,
      post: {
        postTitle: '',
        postMessage: '',
        postImage: '',
      },
      comments : Object,
      
    }
  },

  components: {
    CreateComment,
    TheComment,
    UpdatePost,
    DeletePost,
  },

  mounted() {
    //Axios Api pour obtenir tous les posts
    instance.get('/posts', {
        headers: {
          'content-type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    .then(response => {
      return this.posts = response.data;
    })
    .catch(error => {
      console.log(error)
    })
  },
}

</script>

<style scoped>
  .row{
    margin: 0;
  }
</style>

