<template>
  <div id="UserListCard">
    <v-card app max-width="400" class="mx-auto" outlined elevation="1">
      <v-list>
        <v-list-item v-for="item in users" :key="item.title" >
          <v-list-item-content>
            <v-list-item-title v-text="item.title">{{ item.title }}</v-list-item-title>
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
// Axios
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
});

export default {
  name: 'UserListCard',

  data () {
    return {
      users: [
        {title: 'name', avatar: 'https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png'},
      ],
    }
  }, 

  methods: {
    showAllUsers() {
      instance.get('/users', [
        
      ])
      .then(response => {
        console.log(response)
        this.users = response.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
};
</script>
