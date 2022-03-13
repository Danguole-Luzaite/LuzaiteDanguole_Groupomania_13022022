<template>
  <v-main id="Profil">
    <v-container fluid color="orange lighten-1" class="mt-15">
      <v-card app max-width="600" class="mx-auto" elevation="4" outlined>
        <v-card-title class="justify-center">Modifier votre profil de membre</v-card-title>
        <v-divider class="my-1"></v-divider>
          <v-card-text>
            <form action="" class="justify-center">
              <v-card-actions class="d-flex flex-column">
                <v-avatar class="profile" color="grey" size="150">
                  <v-img src='../assets/default_avatar.png'></v-img>
                </v-avatar>
                <v-btn small class="mt-2" >Modifier la photo de profil</v-btn>
                <v-card-title>User Prenom Nom</v-card-title>
              </v-card-actions>
              <v-text-field clearable outlined dense v-model="name" placeholder="Modifier votre prénom"></v-text-field>
              <v-text-field clearable outlined dense v-model="lastname" placeholder="Modifier votre nom" class="mb-6"></v-text-field>
              <v-card-actions class="justify-space-between">
                <v-btn @click="goBack">Annuler</v-btn>
                <v-btn disabled type="submit">Sauvegarder les modifications</v-btn>
              </v-card-actions>
            </form>
          </v-card-text>  
      </v-card>
    </v-container>
  </v-main>
</template>

<script>


export default {
  name: 'Profil',

  data: () => ({

  }),

  components: {
    
  },

  methods:{
    goBack(){
      this.$router.push({ name: 'Accueil' })
    },
  },

}

</script>

