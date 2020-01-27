<template>

  <v-container>
                <v-snackbar
               v-model="snackbar"
               :bottom="y === 'bottom'"
               :color="color"
               :left="x === 'left'"
               :multi-line="mode === 'multi-line'"
               :right="x === 'right'"
               :timeout="timeout"
               :top="y === 'top'"
               :vertical="mode === 'vertical'"
                >
               {{ text }}
               <v-btn
                 dark
                 text
                 @click="snackbar = false"
               >
                 Close
               </v-btn>
             </v-snackbar>
    <h1 class="headline">[[Add New Audio]]</h1>
    <v-btn  @click="$router.go(-1)" bottom
                dark
                fab
                right
                class="ma-12"
                fixed color="primary">
         <v-icon dark>mdi-arrow-left</v-icon>
       </v-btn>
  <v-form v-model="valid">
  <v-container>
    <v-dialog v-model="loading" fullscreen full-width>
      <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
        <v-layout justify-center align-center>
          <v-progress-circular
            indeterminate
            color="primary">
          </v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
       <v-row>
         <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="videotitle"
            :rules="nameRules"
            :counter="30"
            label="Audio Title"
            solo
            required
          ></v-text-field>
        </v-col>
       </v-row>
       <v-row>
         <v-col
          cols="12"
          md="4"
        >
          <v-file-input
          prepend-icon="mdi-book"
           accept=".mp3"
           label="AudioFile"
           v-model="video"
           show-size
           solo></v-file-input>

        </v-col>
       </v-row>

       <v-row>
         <v-col
          cols="12"
          md="4"
        >
        <v-textarea
         solo
         v-model="videodescription"
         name="input-7-4"
         label="Audio Description"
       ></v-textarea>
        </v-col>
       </v-row>
       <v-row>
         <v-col
          cols="12"
          md="4"
        >
        <v-btn small color="primary" v-on:click="uploadNewAudio">Upload New Audio</v-btn>

      </v-col>
       </v-row>
  </v-container>
 </v-form>

</v-container>

</template>
<script>

import { uuid } from 'vue-uuid';
import firebase from 'firebase';
export default{
  name:'AddAudio',
  data(){
    return{
      courseid:null,
      uuid: uuid.v1(),
      videotitle:null,
      videodescription:null,
      video:null,
      coverUrl:null,
      videoUrl:null,
      loading:false,
      snackbar: false,
      color:'green',
      text: 'Success, uploaded a new audio!!',

    }
  },
  methods:{
    uploadNewAudio(){
      if(!(this.videotitle==null || this.videodescription==null ||this.video==null)){
        this.loading=true;


          this.coverUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Icons8_flat_audio_file.svg/1024px-Icons8_flat_audio_file.svg.png";

          var videofile =this.video;
          firebase.storage().ref('audio/audios/'+uuid.v4()+'.mp3').put(videofile).then(snapshot=> {
          snapshot.ref.getDownloadURL().then(vUrl=> {
            this.videoUrl=vUrl;
            var key=firebase.database().ref().child('courseitems/').child(this.$route.params.course_id).push().key;
            firebase.database().ref().child('courseitems/').child(this.$route.params.course_id).child(key).set({
              id:key,
              title:this.videotitle,
              cover:this.coverUrl,
              file:this.videoUrl,
              description:this.videodescription,
              date:firebase.database.ServerValue.TIMESTAMP,
              type:"audio"
            });
            this.loading=false;
            this.showSnack("green","new audio uploaded");
          });


        });



      }else{
        this.showSnack("red","Insert form correctly");
      }
   },
   showSnack(color,text){
     this.color=color;
     this.text=text;
     this.snackbar=true;
   }
 },
 beforeRouterEnter (to, from, next) {
    this.courseid=this.$route.params.course_id;
 }
}
</script>
