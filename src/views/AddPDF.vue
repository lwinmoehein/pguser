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
    <h1 class="headline">[[Add New PDF]]</h1>
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
            v-model="pdftitle"
            :rules="nameRules"
            :counter="30"
            label="PDF Title"
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
           accept=".pdf"
           label="PDF FIle"
           v-model="pdf"
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
           label="Cover Image"
           v-model="pdfcover"
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
         v-model="pdfdescription"
         name="input-7-4"
         label="PDF Description"
       ></v-textarea>
        </v-col>
       </v-row>
       <v-row>
         <v-col
          cols="12"
          md="4"
        >
        <v-btn small color="primary" v-on:click="uploadNewPDF">Create New PDF</v-btn>

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
  name:'AddPDF',
  data(){
    return{
      courseid:null,
      uuid: uuid.v1(),
      pdftitle:null,
      pdfdescription:null,
      pdfcover:null,
      pdf:null,
      coverUrl:null,
      pdfUrl:null,
      loading:false,
      snackbar: false,
      color:'green',
      text: 'Success, created a new PDF!!',

    }
  },
  methods:{
    uploadNewPDF(){
      if(!(this.pdftitle==null || this.pdfdescription==null ||this.pdf==null)){
        this.loading=true;

        var file =this.pdfcover;
        firebase.storage().ref('pdfs/pdfthumbs/'+uuid.v4()+'.jpg').put(file).then(snapshot=> {
        snapshot.ref.getDownloadURL().then(downloadURL=> {
          this.coverUrl=downloadURL;

          var pdffile =this.pdf;
          firebase.storage().ref('pdfs/pdfs/'+uuid.v4()+'.pdf').put(pdffile).then(snapshot=> {
          snapshot.ref.getDownloadURL().then(pdUrl=> {
            this.pdfUrl=pdUrl;
            var key=firebase.database().ref().child('pdfs/').child(this.$route.params.course_id).push().key;
            firebase.database().ref().child('pdfs/').child(this.$route.params.course_id).child(key).set({
              id:key,
              pdftitle:this.pdftitle,
              pdfcover:this.coverUrl,
              pdf:this.pdfUrl,
              pdfdescription:this.pdfdescription,
              pdfcreateddate:firebase.database.ServerValue.TIMESTAMP,
            });
            this.loading=false;
            this.showSnack("green","new pdf created");
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
