<template>
  <v-app>
    <Toast/>
    <LoadingDialog/>

    <TopToolbar></TopToolbar>
    <v-content>
      <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
      >App is under development!!!
      </v-alert>
       <router-view></router-view>
     </v-content>
    <BottomNav></BottomNav>

  </v-app>
</template>

<script >
  import TopToolbar from './components/TopToolbar.vue';
  import Toast from './components/Toast.vue';
  import LoadingDialog from './components/LoadingDialog.vue';
  import BottomNav from './components/BottomNav.vue';
  import store from './store/';
  import * as type from './store/mutationTypes/types';
  import { mapState } from 'vuex';

  import { Component, Vue } from 'vue-property-decorator';

  import firebase from 'firebase';
  import firebaseConfig from './config/dbconfig.js';

  firebase.initializeApp(firebaseConfig);


  @Component({
    components: {
      TopToolbar,
      BottomNav,
      Toast,
      LoadingDialog

    },
    methods :{

    },
    mounted(){

    }
  })
  export default class extends Vue {
  }
</script>
