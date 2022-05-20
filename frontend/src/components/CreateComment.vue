<template>
  <v-dialog id="CreateComment" v-model="dialog" persistent max-width="550">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark small elevation="1" v-bind="attrs" v-on="on" class="ml-2">
        Discutez ici 
        <v-icon dark left>chat_bubble</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form >
            <v-row class="d-flex flex-column">
              <v-textarea
              label="Écrivez un commentaire..."
              outlined
              clearable class="mb-2 mt-6"
              auto-grow
              v-model="commentText"
              ></v-textarea>
              <v-card-actions>
                <v-btn raised text class="mr-2" @click="dialog = false">Anuller</v-btn>
                <v-btn  type="submit" raised text color="orange darken-4" @click="publishComment">Publier</v-btn>
              </v-card-actions>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>    
    </v-card> 
  </v-dialog>
</template>

<script>
const axios = require('axios');

export default {
  name: 'CreateComment',
  data () {
    return {
      dialog: false,
      commentText: '',
    }
  },
  props: {
    post: Object,
  },

  methods: {
    publishComment(){
      //axios pour soumettre le nouveau comment créé
      axios.post('http://localhost:3000/api/comments', 
      {
        commentMessage: this.commentText,
        userId: JSON.parse(localStorage.getItem('userId')),
        postId: this.post.postId
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response) =>{
        console.log(response);
        if(response.status == 201){
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
