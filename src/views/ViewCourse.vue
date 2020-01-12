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
    <h1 class="headline">Course Details</h1>

      <v-list>
            <v-card   v-for="course in courses"
              :key="course.id"
                class="mx-auto"
                max-width="600"
                outlined

              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">OVERLINE</div>
                    <v-list-item-title class="headline mb-1">{{course.pdftitle}}</v-list-item-title>
                    <v-list-item-subtitle>{{course.pdfdescription}}</v-list-item-subtitle>
                    <v-list-item-subtitle v-text="course.pdfcreateddate"></v-list-item-subtitle>

                  </v-list-item-content>

                  <v-list-item-avatar
                    tile
                    size="100"
                    color="grey"
                   v-bind:src="course.pdfcover"
                  >
                        <v-img :src="course.pdfcover"
                        lazy-src="https://picsum.photos/id/11/100/60"
                         aspect-ratio="1"
                         class="grey lighten-2"
                        >
                        <template v-slot:placeholder>
                               <v-row
                                 class="fill-height ma-0"
                                 align="center"
                                 justify="center"
                               >
                                 <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                               </v-row>
                             </template>
                      </v-img>
                </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                  <v-btn text  @click="updateSelectedItem(course)">Delete</v-btn>
                  <v-btn text  @click="openEditDialog(course)">Edit</v-btn>
                  <router-link class="secondary-content" v-bind:to="{ name: 'viewcourse', params: { course_id: course.id }}"><i class="fa fa-eye"></i></router-link>
                  <router-link class="secondary-content" v-bind:to="{ name: 'addpdf', params: { course_id: course.id }}"><i class="fa fa-plus"></i></router-link>

                </v-card-actions>
              </v-card>


  </v-list>

  <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure you wanna delete this course?</v-card-title>
        <v-card-text>{{dialogtext}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelDialog">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteItem">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row justify="center">
      <v-dialog v-model="editdialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Course</span>
          </v-card-title>
            <v-container>
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


                </v-col>
                 </v-row>
            </v-container>
           </v-form>
            </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="editdialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="EditCourse(course)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

</v-container>
</template>
<script>
import { uuid } from 'vue-uuid';
import firebase from 'firebase';
export default{
  name:'viewcourse',

  methods:{
     deleteButtonClicked(){
       this.dialogtext+=this.clickeditem.coursetitle;
       this.dialog=true
     },
     updateSelectedItem(course){
       this.clickeditem=course;
       this.deleteButtonClicked();
     },
     cancelDialog(){
       this.dialog=false;
       this.dialogtext='';
     },
     deleteItem(course){

       this.dialogtext='';
       this.dialog=false;
       firebase.database().ref().child('pdfs/').child(this.$route.params.course_id).child(this.clickeditem.id).set(null).then(snap=>{
         this.showSnack("green","deleted course");
         let i = courses.map(item => item.id).indexOf(this.clickeditem.id) // find index of your object
         courses.splice(i, 1)
       });
     },
     showSnack(color,text){
       this.color=color;
       this.text=text;
       this.snackbar=true;
     },

     timestampToDate(timestamp){
       var offsetVal = timestamp || 0;
       var serverTime = Date.now() + offsetVal;
       console.log(serverTime);
       return serverTime;
     },
     openEditDialog(course){
       this.editdialog=true;
       this.clickeditem=course;
       this.coursetitle=course.coursetitle;
       this.coursedescription=course.coursedescription;

     },

  },
  data(){
    return{
      courses:[],
      dialog:false,
      dialogtext:"Course Name: ",
      clickeditem:null,
      snackbar:false,
      text:'hello',
      color:'',
      index:0,
      editdialog:false,
      coursetitle:null,
      coursedescription:null,
      courseimage:null
  }
  },
  mounted(){
    firebase.database().ref().child('pdfs').child(this.$route.params.course_id).once('value', (courses) => {
        courses.forEach((course) => {
          console.log(course);
          this.courses.push({
            id: course.child('id').val(),
            pdftitle:course.child('pdftitle').val(),
            pdf:course.child('pdf').val(),
            pdfcover: course.child('pdfcover').val(),
            pdfdescription: course.child('pdfdescription').val(),
            pdfcreateddate:new Date(course.child('pdfcreateddate').val()).toDateString(),
          })

        })
       this.courses=this.courses.reverse();
      });


  }
}
</script>
