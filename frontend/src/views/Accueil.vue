<template>
 
  <div id="Accueil">
  
    <v-app-bar app color="orange darken-4" dark>
      <v-img max-height="130" contain src="@/assets/logos/icon-left-font-monochrome-white.png"></v-img>
      <v-spacer></v-spacer>
      <v-tabs right icons-and-text background-color="orange darken-4" class="mr-10">
        <v-tab text>Accueil<v-icon>home</v-icon></v-tab>
        <v-tab text @click="goToProfile">Mon profil<v-icon>account_circle</v-icon></v-tab>
        <v-tab text @click="backToLogin">Se déconnecter<v-icon>logout</v-icon></v-tab>
      </v-tabs> 
    </v-app-bar>

    <v-main>

      <v-container fluid>
        <v-row class="mb-9">
          <!-- Liste des membres -->
          <v-col cols="12" sm="3">
            <v-card min-height="268" class="deep-orange lighten-5" elevation="3">
              <v-card-title class="justify-center">Liste des membres</v-card-title>
              <v-divider class="mb-2"></v-divider>
              <user-list-card/>
            </v-card>
          </v-col>
          <!-- Les postes -->
          <v-col cols="12" sm="6">
            <v-card min-height="70vh" class="deep-orange lighten-5" elevation="6">
              <v-card-title class="justify-center">Les postes</v-card-title>
              <v-divider></v-divider>
              <!-- Card : Déposer un nouveau post -->
              <v-card color="grey lighten-5">
                <v-card-text class="d-flex" align-center>
                  <v-avatar color="grey lighten-2" size="44" class="mr-5">
                    <v-img src='../assets/default_avatar.png'></v-img>
                  </v-avatar>
                  <v-card-actions>
                    <create-new-post/>
                  </v-card-actions>
                </v-card-text>
              </v-card>
              <v-divider class="mb-4"></v-divider>
              <!-- Afficher les postes créés ici -->
              <the-post/>
            </v-card>
          </v-col>
          <!-- Membres en ligne -->
          <v-col cols="12" sm="3">
            <v-card min-height="268" class="deep-orange lighten-5" elevation="3">
              <v-card-title class="justify-center">Membres en ligne</v-card-title>
              <v-divider class="mb-2"></v-divider>
              <users-signed-in/>
            </v-card>
          </v-col>
        </v-row> 
      </v-container>
      
    </v-main>
  </div> 
  
</template>

<script>
import UserListCard from '../components/UserListCard.vue';
import UsersSignedIn from '../components/UsersSignedIn.vue';
import CreateNewPost from '../components/CreateNewPost.vue';
import ThePost from '../components/ThePost.vue';

export default {
  name: 'Accueil',
  data: () => ({
    
  }),

  components: {
    UserListCard,
    UsersSignedIn,
    CreateNewPost,
    ThePost,
  },
  methods: {
    goToProfile() {
      this.$router.push({ name: 'Profil' })
    },
    backToLogin() {
      this.$router.push({ name: 'Connexion' })
    },
  },
};
</script>


<style lang="scss" scoped>

</style>
