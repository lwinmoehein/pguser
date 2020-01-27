<template>
  <v-container>
  <v-btn  @click="$router.go(-1)" bottom
              dark
              fab
              right
              class="ma-12"
              fixed color="primary">
       <v-icon dark>mdi-arrow-left</v-icon>
     </v-btn>
     <a href="url"/>
</v-container>
</template>

<script>

export default {
  components: {

  },
  data(){
    return{
      url:null,
    }
  },
  mounted(){

      this.url=this.$route.params.pdfurl;

  }
}
</script>
