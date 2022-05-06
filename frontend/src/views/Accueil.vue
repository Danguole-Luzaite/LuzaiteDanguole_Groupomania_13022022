<template>
 
  <div id="Accueil">
    <nav-accueil/>
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
                  <v-card-subtitle>{{ user.firstName }} {{ user.lastName }}</v-card-subtitle>
                  <v-card-actions>
                    <!-- component : createNewPost -->
                    <create-new-post/>
                  </v-card-actions>
                </v-card-text>
              </v-card>
              <v-divider class="mb-4"></v-divider>
              <!-- Afficher les postes créés ici -->
              <the-post/>
            </v-card>
          </v-col>
        </v-row> 
      </v-container>     
    </v-main>
  </div> 
  
</template>

<script>
import UserListCard from '../components/UserListCard.vue';
import CreateNewPost from '../components/CreateNewPost.vue';
import ThePost from '../components/ThePost.vue';
import navAccueil from '../components/NavigationAccueil.vue';
// Axios
const axios = require('axios');


export default {
  name: 'Accueil',
  data: () => ({
    userId: localStorage.getItem('userId'),
    user: {},
    "user.firstName": '',
    "user.lastName": '',
    //"user.userAvatar": '', 
    
  }),

  mounted(userId) {
    //Axios Api pour obtenir seul utilisateur
    axios.get('http://localhost:3000/api/auth/users/' + this.userId, 
    {
      params: {
          userId
        }
    })
    .then(response => {
      //console.log(response.data)
      return this.user = response.data;
    })
    .catch(error => {
      console.log(error)
    })
  },

  components: {
    UserListCard,
    CreateNewPost,
    ThePost,
    navAccueil,
  },
  
};
</script>


<style lang="scss" scoped>

</style>
