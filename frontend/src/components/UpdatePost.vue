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
                <v-text-field clearable v-model="edit_title" label="Titre du poste"></v-text-field>
              </validation-provider>
              <validation-provider name="Message">
                <v-textarea clearable outlined auto-grow v-model="edit_message" label="Texte du message"></v-textarea>
              </validation-provider>
              <validation-provider name="Image">
                <v-file-input outlined accept="image/*" v-model="edit_image"  @change="selectFile()" label="Publier une image" ref="image"></v-file-input>
              </validation-provider>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-4" text @click="dialog = false">Anuller</v-btn>
                <v-btn type="submit" color="orange darken-4" text :disabled="invalid" @click="saveChanges">Enregistrer les modifications</v-btn>
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
/*const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});*/

export default {
  name: 'UpdatePost',

  data: () => ({
      dialog: false,
      edit_title: '',
      edit_message: '',
      edit_image: '',
  }),

  components: {
      ValidationObserver,
      ValidationProvider,
  },

  methods: {
    selectFile() {
      this.edit_image = this.$ref.edit_image.files[0];
    },

    saveChanges() {
      const formData = new FormData();
      formData.append('postTitle', this.edit_title);
      formData.append('postMessage', this.edit_message);
      formData.append('image', this.edit_image);
      formData.append('userId', JSON.parse(localStorage.getItem("userId")));
      //axios method pour modifier les données du poste
      axios.put('http://localhost:3000/api/posts/{postId}', formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        params: {
          postId : ''
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
