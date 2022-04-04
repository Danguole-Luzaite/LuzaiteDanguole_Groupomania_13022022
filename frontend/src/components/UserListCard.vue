<template>
  <div id="UserListCard">
    <v-card app max-width="400" class="mx-auto" outlined elevation="1">
      <v-virtual-scroll :bench="benched" :items="items" :item-height="50" height="260">
        <v-list>
          <v-list-item v-for="item in users" :key="item.userId" >
            <v-list-item-content>
              <v-list-item-title>{{ item.firstName }} {{ item.lastName }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-img :src="item.userAvatar"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-virtual-scroll>  
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
    return{
      benched: 5,
       users:[
      {
        firstName: '',
        lastName: '',
        userAvatar: '',
      },
      ],
    }
   
  },
  computed: {
      items () {
        return Array.from({ length: this.users.length })
      },
      length () {
        return 1000
      },
  },


  mounted() {
    //Axios Api pour obtenir tous les users
    instance.get('/users')
    .then(response => {
      return this.users = response.data;
      //console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  },

};
</script>
