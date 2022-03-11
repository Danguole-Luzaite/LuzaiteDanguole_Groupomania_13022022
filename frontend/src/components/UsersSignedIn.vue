<template>
  <div id="UsersSignedIn">
    <v-card app max-width="400" class="mx-auto" outlined>
      <v-list>
        <v-list-item v-for="chat in online" :key="chat.title">
          <v-list-item-avatar>
            <v-img
              :alt="`${chat.title} avatar`"
              :src="chat.avatar"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="chat.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon color="green darken-4 accent-4">
              mdi-message-outline
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'UsersSignedIn',
  data: () => ({
    online: [
      {
        avatar: 'https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png',
        title: 'firstName lastName',
      },
    ],
  }),
};
</script>