<template>
  <div id="navAccueil">
   
    <v-card class="mx-auto overflow-hidden" height="145">
      <v-app-bar  color="orange darken-4" dark>
        <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = true" ></v-app-bar-nav-icon>
        <v-img max-height="130" max-width="165" contain
        src="@/assets/logos/icon-left-font-monochrome-white.png" alt="le groupomania logo"></v-img>
        <v-spacer></v-spacer>
        <v-tabs right icons-and-text background-color="orange darken-4" class="mr-10 d-none d-sm-block " >
          <v-tab text  @click="goToAccueil">Accueil<v-icon>home</v-icon></v-tab>
          <v-tab text @click="goToProfile">Mon profil
            <v-avatar size="30">
              <v-img v-bind:src="user.userAvatar" alt="image de profil"/>
            </v-avatar>
          </v-tab>
          <v-tab text @click="backToLogin">Se déconnecter<v-icon>logout</v-icon></v-tab>
        </v-tabs> 
      </v-app-bar>
      <!-- v-navigation-drawer en version mobile -->
      <v-navigation-drawer v-model="drawer" absolute temporary class="hidden-sm-and-up">
        <v-list nav dense>
          <v-list-item-group v-model="group"
          active-class="orange--text text--accent-3">
            <v-list-item @click="goToAccueil">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Accueil</v-list-item-title>
            </v-list-item>

            <v-list-item @click="goToProfile">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Mon profil</v-list-item-title>
            </v-list-item>

            <v-list-item @click="backToLogin">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Se déconnecter</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
     </v-card>
  </div>
</template>


<script>
const axios = require('axios');

export default {
  name: 'navAccueil',

  data: () => ({
    user: {},
    userId: localStorage.getItem('userId'),
    drawer: false,
    group: null,
  }),

  mounted(userId) {
    //Axios API pour obtenir un seul utilisateur
    axios.get('http://localhost:3000/api/auth/users/' + this.userId, 
    {
      params: {
          userId
        }
    })
    .then(response => {
      return this.user = response.data;
    })
    .catch(error => {
      console.log(error)
    })
  },


  methods: {
    goToAccueil() {
      this.$router.push({ name: 'Accueil' })
    },
    goToProfile() {
      this.$router.push({ name: 'Profil' })
    },
    backToLogin() {
      localStorage.clear();
      this.$router.push({ name: 'Connexion' })
    },
  },

}; 
</script>

<style scoped>
  .v-tab{
    padding-left: 8px;
    padding-right: 8px;
  };
</style>
