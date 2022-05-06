<template>
  <div id="Profil">
    <nav-accueil/>
    <v-main>
      <v-container fluid color="orange lighten-1" class="mt-15">
        <v-card app max-width="600" class="mx-auto" elevation="4" outlined>
          <v-card-title class="justify-center">Modifier votre profil de membre</v-card-title>
          <v-divider class="my-1"></v-divider>
            <v-card-text>
              <!-- form  -->
              <form  class="justify-center">
                <v-card-actions class="d-flex flex-column">
                  <v-avatar class="profile" color="grey" size="150">
                    <v-img v-bind:src="user.userAvatar"/>
                  </v-avatar>
                  <v-btn  class="mt-2" accept="image/*" v-model="user.userAvatar" ref="image" @change="selectFile()" v-bind:src="user.userAvatar" >Modifier la photo de profil</v-btn>
                  
                  <v-card-title >{{ user.firstName }} {{ user.lastName }}</v-card-title>
                </v-card-actions>
                <v-text-field clearable outlined dense v-model="user.firstName" placeholder="Modifier votre prénom"></v-text-field>
                <v-text-field clearable outlined dense v-model="user.lastName" placeholder="Modifier votre nom" class="mb-6"></v-text-field>
                <v-card-actions class="justify-space-between">
                  <v-btn @click="goBack">Annuler</v-btn>
                  <v-btn  type="submit" @click="changeUserData(userId)">Sauvegarder les modifications</v-btn>
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
    userId: localStorage.getItem('userId'),
    user: {},  
    //v-model pour changer:
    "user.firstName": '',
    "user.lastName": '',
    "user.userAvatar": '',

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
      this.user.userAvatar = this.$ref.image.files[0];
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
        if (response.status == 200){
          location.reload();
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

