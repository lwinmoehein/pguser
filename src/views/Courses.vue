<template>
  <v-container>
    <h1 class="headline">Available Courses</h1>
      <v-list>
            <v-card   v-for="course in courses"
              :key="course.id"
                class="mx-auto"
                max-width="600"
                outlined
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">Course</div>
                    <v-list-item-title class="headline mb-1">{{course.coursetitle}}</v-list-item-title>
                    <v-list-item-subtitle>{{course.coursedescription}}</v-list-item-subtitle>
                    <v-list-item-subtitle v-text="course.coursecreateddate"></v-list-item-subtitle>

                  </v-list-item-content>

                  <v-list-item-avatar
                    tile
                    size="100"
                    color="grey"
                   v-bind:src="course.courseimage"
                  >
                        <v-img :src="course.courseimage"
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
                  <v-btn class="ma-1" color="primary" dark text  @click="updateSelectedItem(course)">Delete</v-btn>
                  <v-btn class="ma-1" color="primary" dark text  @click="openEditDialog(course)">Edit</v-btn>
                  <v-btn class="ma-1" color="primary" dark text :to="{ name: 'viewcourse', params: { course_id: course.id }}" >View Course</v-btn>

                  <AddContentMenu :courseid="course.id"/>
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
    <v-btn      bottom
                dark
                fab
                right
                class="ma-12"
                fixed
                @click="onAddBtnClicked"
                color="primary"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
</v-container>
</template>
<script>
import store from '../store/';
import * as type from '../store/mutationTypes/types';
import { uuid } from 'vue-uuid';
import firebase from 'firebase';
import AddContentMenu from '../components/AddContentMenu.vue';
export default{
  name:'courses',
  components:{
    AddContentMenu
  },
  methods:{
     onAddBtnClicked(){
       this.$router.replace('addcourse');
     },
     deleteButtonClicked(){
       this.dialogtext+=this.clickeditem.coursetitle;
       this.dialog=true
     },
     updateSelectedItem(course){
       this.clickeditem=course;
       this.deleteButtonClicked();
     },
     EditCourse(course){
       this.sho
       if(!(this.courseimage==null || this.coursetitle==null ||this.coursedescription==null)){
         this.showLoading();
         var file =this.courseimage;
         firebase.storage().ref('courses/thumbs/'+uuid.v4()+'.jpg').put(file).then(snapshot=> {
         this.closeLoading();
         snapshot.ref.getDownloadURL().then(downloadURL=> {
           this.courses[this.courseids.indexOf(this.clickeditem.id)].courseimage=downloadURL;
           firebase.database().ref().child('courses/'+this.clickeditem.id).update({
             coursetitle:this.coursetitle,
             courseimage:downloadURL,
             coursedescription:this.coursedescription,
             coursecreateddate:firebase.database.ServerValue.TIMESTAMP
           });
           this.closeLoading();
           this.editdialog=false;
           this.showSnack("green","course edited");
           });
         });

       }else{
         this.showSnack("red","Insert form correctly")
       }
     }
     ,
     cancelDialog(){
       this.dialog=false;
       this.dialogtext='';
     },
     deleteItem(){
       this.dialogtext='';
       this.dialog=false;
       firebase.database().ref().child('courses/'+this.clickeditem.id).set(null).then(snap=>{
         firebase.database().ref().child('courseitems/'+this.clickeditem.id).set(null).then(snap=>{
           this.showSnack("green","deleted course");
           this.courses.splice(this.courseids.indexOf(this.clickeditem.id),1);
         });
       });

     },
     timestampToDate(timestamp){
       var offsetVal = timestamp || 0;
       var serverTime = Date.now() + offsetVal;
       return serverTime;
     },
     openEditDialog(course){
       this.editdialog=true;
       this.clickeditem=course;
       this.coursetitle=course.coursetitle;
       this.coursedescription=course.coursedescription;
       this.courseimagetemp=course.courseimage;
       this.clickeditem=course;
     },
     showSnack(color,text){
       store.dispatch({
         type: type.ShowToast,
         toasttitle: text,
         toastcolor:color
       })
     },
     showLoading(color,text){
       store.dispatch({
         type: type.ShowLoading,
       })
     },
     closeLoading(color,text){
       store.dispatch({
         type: type.CloseLoading,

       })
     },

  },
  data(){
    return{
      courses:[],
      dialog:false,
      dialogtext:"Course Name: ",
      clickeditem:null,
      index:0,
      editdialog:false,
      coursetitle:null,
      coursedescription:null,
      courseimage:null,
      courseimagetemp:null,
      courseids:[],
      items: [
       { title: 'add pdf' },
       { title: 'add audio' },
       { title: 'add video' },
     ],

  }
  },
  mounted(){
    this.showLoading();
    firebase.database().ref().child('courses').once('value', (courses) => {
        courses.forEach((course) => {
          this.courses.push({
            id: course.child('id').val(),
            courseimage:course.child('courseimage').val(),
            coursetitle: course.child('coursetitle').val(),
            coursedescription: course.child('coursedescription').val(),
            coursecreateddate:new Date(course.child('coursecreateddate').val()).toDateString(),
          });
          this.courseids.push(course.child('id').val());
          this.closeLoading();

        })
      });


  }
}
</script>
