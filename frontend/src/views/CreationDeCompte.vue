<template>
  <div id="CreationDeCompte">
    <the-navigation/>

    <v-main>
      <v-content>
        <v-card elevation="4" max-width="550" class="mx-auto">
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-card-title class="justify-center">Inscription</v-card-title>
            <v-card-text>
              <v-form class="px-3" @submit.prevent="handleSubmit">
                <validation-provider name="Name">
                  <v-text-field label="Prénom" v-model="name" :rules="rules" hide-details="auto"></v-text-field>
                </validation-provider> 
                <validation-provider name="Surname">
                  <v-text-field label="Nom" v-model="surname" :rules="rules" hide-details="auto"></v-text-field>
                </validation-provider>
                <validation-provider name="Email">
                  <v-text-field label="Adresse email" v-model="email" :rules="rules" hide-details="auto"></v-text-field>
                </validation-provider>
                <validation-provider name="Password">
                  <v-text-field label="Mot de passe" v-model="password" type="password" :rules="rules" hide-details="auto"></v-text-field>
                </validation-provider>
                <v-card-actions>
                  <v-btn type="submit" :disabled="invalid" block dark color="orange darken-4">Créer mon compte</v-btn>
                </v-card-actions>
              </v-form>
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
          </validation-observer>
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

export default {
  name: 'CreationDeCompte',
  data: () => ({
      rules: [
        value => !!value || 'Required.',
      ],
  }),
  components: {
    TheNavigation,
    TheFooter,
    ValidationProvider,
    ValidationObserver,
  },
};
</script>

<style scoped>
  .link_vous_avez_compte{
    text-decoration: none;
  }
</style>