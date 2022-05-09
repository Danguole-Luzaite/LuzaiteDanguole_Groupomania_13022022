<template>
  <div id="UserListCard">
    <v-card app max-width="400" class="mx-auto" outlined elevation="1">
        <v-list>
          <!-- Afficher jusqu'à 5 utilisateur -->
          <v-list-item v-for="item in (showLessUsers? users: users.slice(0, 5))" :key="item.userId" >
            <v-list-item-content>
              <v-list-item-title>{{ item.firstName }} {{ item.lastName }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-img :src="item.userAvatar" alt="image de profil"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list> 
        <v-card-actions>
          <!-- dialog pour afficher tous les utilisateurs -->
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="orange darken-4" @click="showLessUsers = false" v-bind="attrs" v-on="on">Afficher plus d'utilisateurs</v-btn>
            </template>
            <v-card class="mx-auto" outlined elevation="3">
              <v-toolbar dark color="orange darken-4">
                <v-toolbar-title>La liste de tous les membres :</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <!-- Liste pour tous les utilisateurs -->
              <v-list>
                <v-list-item v-for="item in users" :key="item.userId" >
                  <v-list-item-content>
                    <v-list-item-title>{{ item.firstName }} {{ item.lastName }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar>
                    <v-img :src="item.userAvatar" alt="image de profil"></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-list> 
            </v-card>
          </v-dialog>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// Axios
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
});

export default {
  name: 'UserListCard',

  data () {
    return{
      dialog: false,
      showLessUsers: false,
       users:[
      {
        firstName: '',
        lastName: '',
        userAvatar: '',
      },
      ],
    }
   
  },
  
  mounted() {
    //Axios Api pour obtenir tous les users
    instance.get('/users')
    .then(response => {
      return this.users = response.data;
      //console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  },

};
</script>
