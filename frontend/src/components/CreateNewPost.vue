<template>
  <v-dialog id="CreateNewPost" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="grey darken-4" block large class="white--text">Publier une image/Gif</v-btn>                  
    </template>
    <v-card>
      <v-card-title>Créer un nouveau post</v-card-title>
      <v-card-text>
        <v-container>
          <validationObserver ref="observer">
            <v-form>
              <validation-provider name="PostTitle">
                <v-text-field clearable label="Titre du poste" v-model="postTitle"></v-text-field>
              </validation-provider>
              <validation-provider name="Message">
                <v-textarea clearable outlined auto-grow v-model="postMessage" label="Texte du message"></v-textarea>
              </validation-provider>
              <validation-provider name="Image">
                <v-file-input outlined accept="image/*" v-model="postImage" label="Publier une image"></v-file-input>
              </validation-provider>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-4" text @click="dialog = false">Fermer</v-btn>
                <v-btn type="submit" color="orange darken-4" text @click="submitPost">Postuler</v-btn>
              </v-card-actions>
            </v-form>
          </validationObserver>
        </v-container>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>


<script>
export default {
  name: 'CreateNewPost',
  data: () => ({
    dialog: false,
  }),

  methods: {

  },
};
</script>
