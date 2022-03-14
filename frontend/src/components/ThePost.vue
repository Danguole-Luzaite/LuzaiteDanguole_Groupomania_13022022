<template>
  <v-container id="ThePost" fluid class="mb-5">
    <v-card app max-width="900" max-height="750" class="mx-auto" outlined elevation="2">
      <v-row >
        <v-avatar size="44">
          <v-img src='../assets/default_avatar.png'></v-img>
        </v-avatar>
        <v-card-subtitle>User Prenom Nom</v-card-subtitle>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn icon color="grey" elevation="1" class="mx-2" small>
              <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon elevation="1" small>
              <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-row>
      <v-divider class="mb-2"></v-divider>

      <v-card-text>
        <!-- place pour postTitle-->
        <v-card-title>Titre du post</v-card-title>
        <!-- place pour postMessage-->
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</v-card-text>
        <!-- place pour postImage-->
        <v-img contain max-height="200" max-width="300" src='../assets/default_image.jpg'></v-img>
      </v-card-text>
      <v-divider class="mb-2"></v-divider>
      <!-- button icons pour aimer le post et postuler un comment-->
      <v-card-actions>
        <v-btn icon elevation="1" class="mx-2" color="deep-orange">
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        <v-btn icon elevation="1">
          <v-icon color="grey">chat_bubble</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>


export default {
  name: 'ThePost',

  data: () => ({
   
  }),

  components: {
    
  },

  methods:{

  },


}

</script>

<style scoped>
  .row{
    margin: 0;
  }
</style>

