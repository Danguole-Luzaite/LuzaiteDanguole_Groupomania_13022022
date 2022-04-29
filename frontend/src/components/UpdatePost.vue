<template>
  <v-dialog id="UpdatePost" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="grey" elevation="1" class="mx-2" small v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Modifier votre post</v-card-title>
      <v-card-text>
        <v-container>
          <validationObserver ref="observer" v-slot="{ invalid }">
            <v-form>
              <validation-provider name="PostTitle">
                <v-text-field clearable v-model="post.postTitle" label="Titre du poste" ></v-text-field>
              </validation-provider>
              <validation-provider name="Message">
                <v-textarea clearable outlined auto-grow v-model="post.postMessage" label="Texte du message" ></v-textarea>
              </validation-provider>
              <validation-provider name="Image">
                <v-file-input outlined accept="image/*" v-model="post.postImage"  @change="selectFile()" label="Publier une image" ref="image" v-bind:src="post.postImage"></v-file-input>
                <v-img contain max-height="200" max-width="300" v-bind:src="post.postImage"/>
              </validation-provider>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-4" text @click="dialog = false">Anuller</v-btn>
                <v-btn type="submit" color="orange darken-4" text :disabled="invalid" @click="saveChanges(post.postId)">Enregistrer les modifications</v-btn>
              </v-card-actions>
            </v-form>
          </validationObserver>
        </v-container>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>


<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

// Axios
const axios = require('axios');


export default {
  name: 'UpdatePost',

  data: () => ({
      dialog: false,
      "post.postTitle": '',
      "post.postMessage": '',
      "post.postImage": '',
  }),

  props:{
    post: Object,
    postId: Number
  },

  components: {
      ValidationObserver,
      ValidationProvider,
  },

  methods: {
    selectFile() {
      this.post.postImage = this.$ref.post.postImage.files[0];
    },

    saveChanges(postId) {
      //console.log(" post est modifie :", post)
      const formData = new FormData();
      formData.append('postTitle', this.post.postTitle);
      formData.append('postMessage', this.post.postMessage);
      formData.append('image', this.post.postImage);
      formData.append('userId', JSON.parse(localStorage.getItem("userId")));
      //axios method pour modifier les données du post
      axios.put('http://localhost:3000/api/posts/'+postId, formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        params: {
          postId
        }
      })
      .then(function (response) {
        console.log(response);
        if (response.status == 200){
          this.$router.push({ name: 'Accueil' })
        }
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  },

}
</script>
