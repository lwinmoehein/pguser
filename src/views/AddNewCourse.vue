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
    <h1 class="headline">[[Add New Course]]</h1>
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
            v-model="coursetitle"
            :rules="nameRules"
            :counter="30"
            label="Course Title"
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
          prepend-icon="mdi-camera"
           accept="image/*"
           label="Image File"
           v-model="courseimage"
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
         v-model="coursedescription"
         name="input-7-4"
         label="Course Description"
       ></v-textarea>
        </v-col>
       </v-row>
       <v-row>
         <v-col
          cols="12"
          md="4"
        >
        <v-btn small color="primary" v-on:click="uploadNewCourse">Create New Course</v-btn>

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
  name:'AddNewCourse',
  data(){
    return{
      uuid: uuid.v1(),
      coursetitle:null,
      coursedescription:null,
      courseimage:null,
      loading:false,
      snackbar: false,
      color:'green',
      text: 'Success, created a new course!!',

    }
  },
  methods:{
    uploadNewCourse(){
      if(!(this.courseimage==null || this.coursetitle==null ||this.coursedescription==null)){
        this.loading=true;
        var file =this.courseimage;
        firebase.storage().ref('courses/thumbs/'+uuid.v4()+'.jpg').put(file).then(snapshot=> {
        this.loading=false;
        snapshot.ref.getDownloadURL().then(downloadURL=> {
          var key=firebase.database().ref().child('courses/').push().key;
          firebase.database().ref().child('courses/'+key).set({
            id:key,
            coursetitle:this.coursetitle,
            courseimage:downloadURL,
            coursedescription:this.coursedescription,
            coursecreateddate:firebase.database.ServerValue.TIMESTAMP
          });
          this.loading=false;
          this.showSnack("green","new course created");
          });
        });

      }else{
        this.showSnack("red","Insert form correctly")
      }
   },
   showSnack(color,text){
     this.color=color;
     this.text=text;
     this.snackbar=true;
   }
 }
}
</script>
