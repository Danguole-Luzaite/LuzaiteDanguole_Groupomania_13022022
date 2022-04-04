<template>
  <v-row justify="center" id="DeletePost">
    <v-dialog
      v-model="dialog" 
      persistent :overlay="false"
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon elevation="1" small v-bind="attrs" v-on="on">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Supprimer le post</v-card-title>
        <v-card-text>Voulez-vous supprimer ce post ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Anuller</v-btn>
          <v-btn text color="orange darken-4">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row> 
</template>

<script>


export default {
  name: 'DeletePost',
  data() {
    return {
      dialog: false,
    }
  },
}
</script>