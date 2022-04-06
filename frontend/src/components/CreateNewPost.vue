<template>
  <v-dialog id="CreateNewPost" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="grey darken-4" block large class="white--text">Publier une image/Gif</v-btn>                  
    </template>
    <v-card>
      <v-card-title>Créer un nouveau post</v-card-title>
      <v-card-text>
        <v-container>
          <validationObserver ref="observer" v-slot="{ invalid }">
            <v-form  @submit.prevent="handleSubmit">
              <validation-provider name="PostTitle">
                <v-text-field clearable label="Titre du poste" v-model="title"></v-text-field>
              </validation-provider>
              <validation-provider name="Message">
                <v-textarea clearable outlined auto-grow v-model="message" label="Texte du message"></v-textarea>
              </validation-provider>
              <validation-provider name="Image">
                <v-file-input outlined accept="image/*" v-model="image" label="Publier une image" @change="selectFile()" ref="image"></v-file-input>
              </validation-provider>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-4" text @click="dialog = false">Fermer</v-btn>
                <v-btn type="submit" :disabled="invalid" color="orange darken-4" text @click="submitPost">Postuler</v-btn>
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
const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});


export default {
  name: 'CreateNewPost',
  data: () => ({
    dialog: false,
    title: '',
    message: '',
    image: '',

  }),

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  methods: {
    handleSubmit() {
        this.$refs.observer.validate()
    },

    selectFile() {
      this.image = this.$ref.image.files[0];
    },

    submitPost(){
      //console.log('je suis la')
      const formData = new FormData();
      formData.append('postTitle', this.title);
      formData.append('postMessage', this.message);
      formData.append('image', this.image);
      formData.append('userId', JSON.parse(localStorage.getItem("userId")));
      instance.post('/posts', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: "Bearer " + localStorage.getItem("token")
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
};
</script>
