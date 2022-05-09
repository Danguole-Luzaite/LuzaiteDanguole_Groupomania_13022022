<template>
  <div id="navAccueil">
    <v-app-bar  color="orange darken-4" dark>
      <v-img max-height="130" contain src="@/assets/logos/icon-left-font-monochrome-white.png" alt="le groupomania logo"></v-img>
      <v-spacer></v-spacer>
      <v-tabs right icons-and-text background-color="orange darken-4" class="mr-10">
        <v-tab text @click="goToAccueil">Accueil<v-icon>home</v-icon></v-tab>
        <v-tab text @click="goToProfile">Mon profil<v-icon>account_circle</v-icon></v-tab>
        <v-tab text @click="backToLogin">Se déconnecter<v-icon>logout</v-icon></v-tab>
      </v-tabs> 
    </v-app-bar>
  </div>
</template>


<script>

export default {
  name: 'navAccueil',
  
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
