<template>
  <div id="Connexion">
    <the-navigation/>

    <v-main>
      <v-content>
        <v-container class="mb-10 text-center">
          <h1>Bienvenue sur le réseau social interne pour les employés de Groupomania.</h1>
        </v-container>
        <v-card elevation="4" max-width="550" class="mx-auto">          
            <v-card-title class="justify-center">Connexion</v-card-title>
            <v-card-text>
              <validationObserver ref="observer" v-slot="{ invalid }">
                <v-form class="px-3" @submit.prevent="handleSubmit">
                  <validation-provider name="Email" >
                    <v-text-field 
                    label="Adresse e-mail" 
                    v-model="email" 
                    :rules="emailRules" hide-details="auto"
                    required
                    >
                    </v-text-field>
                  </validation-provider>
                  <validation-provider name="Password">
                    <v-text-field 
                    label="Mot de passe" 
                    type="password" 
                    v-model="password"
                    :rules="passwordRules" hide-details="auto" 
                    required
                    >
                    </v-text-field>
                  </validation-provider>
<!--                <p class="text-right mt-2"><a href="#">Mot de passe oublié ?</a></p> -->
                  <v-card-actions>
                    <v-btn type="submit" :disabled="invalid" block dark color="orange darken-4" @click="connectUser">Se Connecter</v-btn>
                  </v-card-actions>
                </v-form>
              </validationObserver> 
            </v-card-text>

            <v-divider class="mx-4 mt-3"></v-divider>
            <v-card-text class="d-flex justify-space-between align-center mt-4">
              <p class="text-left font-weight-bold">
                <router-link to="/creationdecompte"><a>Vous n'avez pas de compte ?</a></router-link>
              </p>
              <v-card-actions>
                <router-link to="/creationdecompte" class="link_pas_de_compte">
                  <v-btn dark color="orange darken-4">Inscrivez-vous</v-btn>
                </router-link>
              </v-card-actions>
            </v-card-text>         
        </v-card>
      </v-content>
    </v-main>
    <the-footer/>
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation';
import TheFooter from '../components/TheFooter.vue';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
setInteractionMode('eager');
// Axios
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
});

export default {
  name: 'Connexion',
  data: () => ({
    email: '',
      emailRules: [
      v => !!v || 'Email ne peux pas être vide',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email doit être valide'
      ],
    password: '',
      passwordRules: [
        v => !!v || 'Mot de passe ne peux pas être vide',
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Le mot de passe doit contenir au moins une lettre minuscule, un chiffre, un caractère spécial et une lettre majuscule',
      ],
  }),

  components: {
    TheNavigation,
    TheFooter,
    ValidationProvider,
    ValidationObserver,
  },

  methods: {
    handleSubmit() {
        this.$refs.observer.validate()
    },
    connectUser(){
      instance.post('/login', {
        email: this.email,
        password: this.password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>
  .link_pas_de_compte{
    text-decoration: none;
  }
</style>