<template>
  <div id="CreationDeCompte">
    <the-navigation/>

    <v-main>
      
        <v-card elevation="4" max-width="550" class="mx-auto">
          
            <v-card-title class="justify-center">Inscription</v-card-title>
            <v-card-text>
              <Validation-observer ref="observer" v-slot="{ invalid }">
                <v-form class="px-3" @submit.prevent="submitHandler">
                  <validation-provider name="Name" v-slot="{ errors }" rules="required">
                    <v-text-field label="Prénom" v-model="name" :error-messages="errors" required></v-text-field>
                  </validation-provider> 
                  <validation-provider name="Surname" v-slot="{ errors }" rules="required">
                    <v-text-field label="Nom" v-model="surname" :error-messages="errors" required></v-text-field>
                  </validation-provider>
                  <validation-provider name="Email" v-slot="{ errors }" rules="required|email">
                    <v-text-field label="Adresse email" v-model="email" :error-messages="errors" required></v-text-field>
                  </validation-provider>
                  <validation-provider name="Password" v-slot="{ errors }" rules="required">
                    <v-text-field label="Mot de passe" v-model="password" :error-messages="errors" type="password" required></v-text-field>
                  </validation-provider>
                  <v-btn type="submit" :disabled="invalid" 
                  dark  style="color: #000 !important" 
                  class="createAccount" color="orange darken-4" block 
                  @click="submitNewAccount">
                    Créer mon compte
                  </v-btn>
                </v-form>
              </Validation-observer>
            </v-card-text>
            
            <v-divider class="mx-4 mt-4"></v-divider>
            <v-card-text class="d-flex justify-space-between align-center mt-4">
              <p class="text-left font-weight-bold">
                <router-link to="/"><a>Vous avez déjà un compte ?</a></router-link>
              </p>
              <v-card-actions>
                <router-link to="/" class="link_vous_avez_compte">
                  <v-btn dark color="orange darken-4" class="link_pas_de_compte">Se Connecter</v-btn>
                </router-link>
              </v-card-actions>
            </v-card-text>

        </v-card>
      
    </v-main>
    <the-footer/>
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation';
import TheFooter from '../components/TheFooter.vue';
//vee-validate
import { required, email, regex } from 'vee-validate/dist/rules';
import { extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate';
setInteractionMode('eager')
// Axios
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
});

extend('required', {
  ...required,
  message: '{_field_} ne peux pas être vide',
})
extend('regex', {
  ...regex,
  message: '{_field_} {_value_} ne correspond pas {regex}',
})
extend('email', {
  ...email,
  message: 'Email doit être valide',
})


export default {
  name: 'CreationDeCompte',
  data: () => ({
    name: '',
    surname: '',
    email: '',
    password: '',
  }),

  components: {
    TheNavigation,
    TheFooter,
    ValidationProvider,
    ValidationObserver,
  },

  methods: {
    submitHandler() {
      this.$refs.observer.validate(); 
      //alert('Le formulaire a été soumis!');
      //console.log(this.name, this.surname, this.email, this.password); //test 
    },

    submitNewAccount() {
      instance.post('/create', {
        firstName: this.name,
        lastName: this.surname,
        email: this.email,
        password: this.password
      })
      .then(function (response) { 
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      this.$router.push({ name: 'Connexion' })
    }
  },
};
</script>

<style scoped>
  .link_vous_avez_compte{
    text-decoration: none;
  };
  .createAccount {
    color: #000 !important;
  }

</style>