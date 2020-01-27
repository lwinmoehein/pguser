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
    <h1 class="headline">[[Add New Video]]</h1>
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
            label="Video Title"
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
           accept=".mp4"
           label="VideoFile"
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
          <v-file-input
          prepend-icon="mdi-camera"
           accept="image/*"
           label="Video Cover Image"
           v-model="videoCover"
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
         label="Video Description"
       ></v-textarea>
        </v-col>
       </v-row>
       <v-row>
         <v-col
          cols="12"
          md="4"
        >
        <v-btn small color="primary" v-on:click="uploadNewVideo">Upload New Video</v-btn>

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
  name:'AddVideo',
  data(){
    return{
      courseid:null,
      uuid: uuid.v1(),
      videotitle:null,
      videodescription:null,
      videoCover:null,
      video:null,
      coverUrl:null,
      videoUrl:null,
      loading:false,
      snackbar: false,
      color:'green',
      text: 'Success, uploaded a new video!!',

    }
  },
  methods:{
    uploadNewVideo(){
      if(!(this.videotitle==null || this.videodescription==null ||this.video==null||this.videoCover==null)){
        this.loading=true;

        var file =this.videoCover;
        firebase.storage().ref('video/videothumbs/'+uuid.v4()+'.jpg').put(file).then(snapshot=> {
        snapshot.ref.getDownloadURL().then(downloadURL=> {
          this.coverUrl=downloadURL;

          var videofile =this.video;
          firebase.storage().ref('video/videos/'+uuid.v4()+'.mp4').put(videofile).then(snapshot=> {
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
              type:"video"
            });
            this.loading=false;
            this.showSnack("green","new video uploaded");
          });
          });

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
