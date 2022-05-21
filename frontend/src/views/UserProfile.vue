<template>
  <div id="Profil">
    <nav-accueil/>
    <v-main>
      <v-container fluid color="orange lighten-1" class="mt-15">
        <v-card app max-width="600" class="mx-auto" elevation="4" outlined>
          <v-card-title class="justify-center">Votre profil de membre</v-card-title>
          <v-divider class="my-1"></v-divider>
            <v-card-text>
              <!-- form  -->
              <form  class="justify-center">
                <v-card-actions class="d-flex flex-column">
                  <v-avatar class="profile" color="grey" size="150">
                    <v-img v-bind:src="user.userAvatar"  alt="image de profil"/>
                  </v-avatar>

                  <!-- Modifier le profil, v-dialog -->
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }"> 
                      <v-btn  class="mt-2" text color="orange darken-4" v-bind="attrs" v-on="on" >Modifier votre profil</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>Modifier votre profil</v-card-title>
                      <!--<v-alert type="success" v-if="successAlert">Votre photo de profil a été modifié avec succès !</v-alert> -->
                      <v-card-text>
                        <v-container>
                          <v-form>
                             <!-- Modifier firstName et lastName -->
                            <v-text-field clearable outlined dense v-model="user.firstName" placeholder="Modifier votre prénom"></v-text-field>
                            <v-text-field clearable outlined dense v-model="user.lastName" placeholder="Modifier votre nom" class="mb-6"></v-text-field>
                             <!-- Modifier userAvatar -->
                            <v-file-input outlined accept="image/*" 
                            v-model="user.userAvatar"
                            @change="selectFile()"
                            label="Modifier la photo"
                            ref="image"
                            v-bind:src="user.userAvatar"
                            ></v-file-input>
                            <v-img contain max-height="200" class="mb-4" v-bind:src="user.userAvatar"  alt="image de profil"/>
                            <v-divider></v-divider>
                            <v-card-actions class="d-flex flex-wrap justify-center">
                              <v-btn color="grey darken-4" text @click="dialog = false">Retourner</v-btn>
                              <v-btn type="submit" class="ml-0" color="orange darken-4" text  @click="changeUserData(userId)">Sauvegarder</v-btn>
                            </v-card-actions>
                          </v-form>
                        </v-container>
                      </v-card-text>
                    </v-card>                   
                  </v-dialog>
                                  
                  <v-card-title >{{ user.firstName }} {{ user.lastName }}</v-card-title>
                </v-card-actions>
                <v-alert type="success" v-if="successAlert">Votre profil a été modifié avec succès !</v-alert>
                <v-card-actions>
                  <v-btn  block fluid @click="goBack">Retourner à l'accueil</v-btn>
                </v-card-actions>
              </form>
            </v-card-text>  
        </v-card>
      </v-container>
    </v-main>
  </div>  
</template>

<script>
import navAccueil from '../components/NavigationAccueil.vue';
// Axios
const axios = require('axios');

export default {
  name: 'Profil',

  data: () => ({
    dialog: false,
    userId: localStorage.getItem('userId'),
    user: {},  
    //v-model pour changer:
    "user.firstName": '',
    "user.lastName": '',
    "user.userAvatar": '',
    successAlert: false,
    
  }),
  

  components: {
    navAccueil,
  },

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

  methods:{
    selectFile() {
      this.user.userAvatar = this.$ref.user.userAvatar.files[0];
    },

    changeUserData(userId) {
      const formData = new FormData();
      formData.append('firstName', this.user.firstName);
      formData.append('lastName', this.user.lastName);
      formData.append('image', this.user.userAvatar);
      formData.append('userId', JSON.parse(localStorage.getItem("userId")));
      //axios pour modifier le profil d'utilisateur
      axios.put('http://localhost:3000/api/auth/users/profile/'+ userId, formData, 
      {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        params: {
          userId
        }
      })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          location.reload();
          this.successAlert = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },

    goBack(){
      this.$router.push({ name: 'Accueil' })
    },
  },

}

</script>

