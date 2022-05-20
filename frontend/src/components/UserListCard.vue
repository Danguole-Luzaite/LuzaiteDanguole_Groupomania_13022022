<template>
  <div id="UserListCard">
    <v-card app max-width="400" class="mx-auto" outlined elevation="1">
        <v-list>
          <!-- Afficher jusqu'à 5 utilisateur -->
          <v-list-item v-for="item in (showMoreUsers? users: users.slice(0, 5))" :key="item.userId" >
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
          <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"> -->
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="orange darken-4" @click="showMoreUsers = false" v-bind="attrs" v-on="on">Afficher plus d'utilisateurs</v-btn>
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
                  <!-- Avatar d'utilisateur -->
                  <v-list-item-avatar>
                    <v-img :src="item.userAvatar" alt="image de profil"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.firstName }} {{ item.lastName }}</v-list-item-title>
                  </v-list-item-content>
                  <!-- Supprimer l'utilisateur, v-dialog -->
                  <v-list-item-content>
                    <v-dialog v-model="dialogDeleteUser"  max-width="300px">
                      <template v-slot:activator="{ on, attr }">
                        <v-list-item-action>
                          <v-btn color="primary" small v-bind="attr" v-on="on">Suppression de compte</v-btn>
                        </v-list-item-action>
                      </template>
                      <v-card>
                        <v-card-text class="red--text pt-2 subtitle-2">Êtes-vous sûr de vouloir supprimer ce compte ?</v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="dialogDeleteUser = false">Anuller</v-btn>
                        <v-btn text color="orange darken-4" @click="deleteUser(item.userId)">Supprimer</v-btn>
                      </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-list-item-content>
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


export default {
  name: 'UserListCard',

  data () {
    return{
      dialog: false,
      dialogDeleteUser: false,
      showMoreUsers: false,
       users:[
        {
          firstName: '',
          lastName: '',
          userAvatar: '',
        },
      ],
      item: {},
    }
   
  },
  
  mounted() {
    //Axios Api pour obtenir tous les users
    axios.get('http://localhost:3000/api/auth/users')
    .then(response => {
      return this.users = response.data;
    })
    .catch(error => {
      console.log(error)
    })
  },

  methods: {
    //Axios Api pour supprimer
    deleteUser(userId) {
     axios.delete(`http://localhost:3000/api/auth/users/${userId}`, 
     {
       headers: {
          'content-type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
     })
     .then(response => {
       console.log(response);
        if (response.status == 200){
          this.$router.push({ name: 'Connexion' })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
   }
  },

};
</script>
