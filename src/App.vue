<template>
  <v-app>

    <TopToolbar></TopToolbar>
    <v-content>
      <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
      >Mobile App Coming Soon!!!
      </v-alert>
       <router-view></router-view>
     </v-content>
    <BottomNav></BottomNav>

  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TopToolbar from './components/TopToolbar.vue';
  import BottomNav from './components/BottomNav.vue';
  import firebase from 'firebase';
  import firebaseConfig from './config/dbconfig.js';
  firebase.initializeApp(firebaseConfig);
//  import firebase from 'firebase';
//  import firebaseConfig from './config/dbconfig.js';

  //firebase.initializeApp(firebaseConfig);

  @Component({
    components: {
      TopToolbar,
      BottomNav,
    },
    methods :{
      getdata () {
        // firebase.database().ref('/users/' + 'one').on('value', (snapshot) => {
        //    console.log(snapshot.val().username);
        // })
      }
    }
  })
  export default class extends Vue {
  }
</script>
