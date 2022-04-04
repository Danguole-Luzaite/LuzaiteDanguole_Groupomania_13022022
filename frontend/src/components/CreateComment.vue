<template>
  <v-dialog id="CreateComment" v-model="dialog" persistent max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon elevation="1" v-bind="attrs" v-on="on">
        <v-icon color="grey">chat_bubble</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form>
            <v-row class="d-flex flex-column">
              <v-text-field
              label="Écrivez un commentaire..."
              outlined
              clearable class="mb-2 mt-6" 
              ></v-text-field>
              <v-card-actions>
                <v-btn raised text class="mr-2" @click="dialog = false">Anuller</v-btn>
                <v-btn raised text color="orange darken-4">Publier</v-btn>
              </v-card-actions>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>    
    </v-card> 
  </v-dialog>
</template>

<script>

export default {
  name: 'CreateComment',
  data () {
    return {
      dialog: false,
    }
  }

}
</script>
