<template>
  <v-container id="TheComment">
    <v-card max-width="890"  class="mx-auto mb-3" outlined elevation="2" v-for="comment in comments" :key="comment.commentId">
      <v-row>
        <v-avatar size="35" class="ml-2 mt-1">
            <v-img v-bind:src="comment.User.userAvatar" alt="image de profil"/>
        </v-avatar>
        <v-card-subtitle>{{ comment.User.firstName }} {{ comment.User.lastName }}</v-card-subtitle>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- pour supprimer le comment, v-dialog -->
          <v-dialog v-model="dialog" max-width="320px">
            <template  v-slot:activator="{ on, attrs }">
              <v-btn icon elevation="1" small v-bind="attrs" v-on="on"><v-icon class='material-icons'>delete</v-icon></v-btn>
            </template>
            <v-card>
              <v-card-title>Supprimer le commentaire</v-card-title>
              <v-card-text>Voulez-vous supprimer ce commentaire ?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Anuller</v-btn>
                <v-btn text color="orange darken-4" @click="deleteTheComment(comment.commentId)">Supprimer</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> 
        </v-card-actions>
      </v-row>
      <v-divider></v-divider>

      <!-- place pour commentMessage créé -->
      <v-card-text>{{ comment.commentMessage }}</v-card-text>
    </v-card>
  </v-container>
</template>


<script>
const axios = require('axios');
export default {
  name: 'TheComment',
  data () {
    return {
      comments: [],
      //userId: localStorage.getItem('userId'),
      user: {},
      dialog: false,
    }
  },

  props:{
    postId: Number,
  },

  mounted() {
    //Axios Api pour obtenir tous les comments
    axios.get('http://localhost:3000/api/comments/' + this.postId)
    .then(response => {
      console.log("comments: ", response.data );
      return this.comments = response.data;
    })
    .catch(error => {
      console.log(error)
    })
  },

  methods: {
    //axios pour supprimer le comment par commentId
    deleteTheComment(commentId){
      axios.delete('http://localhost:3000/api/comments/'+ commentId + '/' + JSON.parse(localStorage.getItem('userId')), {
        headers: {
          'content-type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response);
        if (response.status == 200){
          location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
}
  
</script>

<style scoped>
  .row{
    margin: 0px;
  }
</style>