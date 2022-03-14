<template>
  <div id="UserListCard">
    <v-card app max-width="400" class="mx-auto" outlined elevation="1">
      <v-list>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'UserListCard',
  data () {
    return {
      items: [
        {title: 'firstName lastName', avatar: 'https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png'},
        {title: 'firstName lastName', avatar: 'https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png'},
      ],
    }
  }
};
</script>
