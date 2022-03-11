<template>
 
  <div id="Accueil">
    <v-app-bar app color="orange darken-4" elevation="1" dark>
      <span><v-img max-height="130" contain src="@/assets/logos/icon-left-font-monochrome-white.png"></v-img></span>
      <v-spacer></v-spacer>
      <v-tabs right icons-and-text background-color="orange darken-4" class="mr-10">
        <v-tab text>Accueil<v-icon>home</v-icon></v-tab>
        <v-tab text>Mon profil<v-icon>account_circle</v-icon></v-tab>
        <v-tab text>Se déconnecter<v-icon>logout</v-icon></v-tab>
      </v-tabs> 
    </v-app-bar>

    <v-main class="grey lighten-3">

      <v-container fluid>
        <v-row class="mb-9">
          <!-- Liste des membres -->
          <v-col cols="12" sm="3">
            <v-card min-height="268">
              <v-card-title class="justify-center">Liste des membres</v-card-title>
              <v-divider class="mb-2"></v-divider>
              <user-list-card/>
            </v-card>
          </v-col>
          <!-- Les postes -->
          <v-col cols="12" sm="6">
            <v-card min-height="70vh">
              <v-card-title class="justify-center">Les postes</v-card-title>
              <v-divider></v-divider>
              <!-- Card : Déposer un nouveau post -->
              <v-card color="orange darken-4" class="px-4">
                <v-card-text class="d-flex">
                  <v-avatar color="grey lighten-2" size="50" class="mr-5" ></v-avatar>
                  <v-card-actions>
                    <create-new-post/>
                  </v-card-actions>
                </v-card-text>
              </v-card>

            </v-card>
          </v-col>
          <!-- Membres en ligne -->
          <v-col cols="12" sm="3">
            <v-card min-height="268">
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

export default {
  name: 'Accueil',
  data: () => ({
    
  }),

  components: {
    UserListCard,
    UsersSignedIn,
    CreateNewPost,
  },
  methods: {

  },
};
</script>


<style scoped>
</style>
