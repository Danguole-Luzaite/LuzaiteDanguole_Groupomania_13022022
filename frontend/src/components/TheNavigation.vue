<template>
  <div id="TheNavigation">
    <v-app-bar app color="orange darken-4" elevation="2" dark height="94" min-height="56"
     class=" mb-7 d-flex justify-center">
      <v-app-bar-content max-height="94" class="d-flex align-center flex-wrap justify-center">
        <v-img cover max-width="170" height="55"  
        src="@/assets/logos/icon-left-font-monochrome-white.png"
        alt="le groupomania logo"
        ></v-img>
        <v-toolbar-title shrink-on-scroll class="ml-5">Page de connexion/inscription</v-toolbar-title>
      </v-app-bar-content>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'TheNavigation'
};
</script>
