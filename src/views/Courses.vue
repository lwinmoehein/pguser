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
                    <div class="overline mb-4">OVERLINE</div>
                    <v-list-item-title class="headline mb-1">{{course.coursetitle}}</v-list-item-title>
                    <v-list-item-subtitle>{{course.coursedescription}}</v-list-item-subtitle>
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
                  <v-btn text  @click="updateSelectedItem(course)">Button</v-btn>
                  <v-btn text>Button</v-btn>
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
</v-container>

</template>
<script>
import { uuid } from 'vue-uuid';
import firebase from 'firebase';
export default{
  name:'courses',

  methods:{
     deleteButtonClicked(){
       this.dialogtext+=this.clickeditem.id;
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
     deleteItem(){
       this.dialogtext='';
       this.dialog=false;

       firebase.database().ref().child('courses/'+this.clickeditem.id).set(null, function(error) {
    if (error) {
      this.showSnack("red","Sorry,an error occurred");
    } else {
      this.showSnack("green","Course Deleted");
    }
  });

     },
     showSnack(color,text){
       this.color=color;
       this.text=text;
       this.snackbar=true;
     }
  },
  data(){
    return{
      courses:[],
      dialog:false,
      dialogtext:"Course Name: ",
      clickeditem:null,
      snackbar:false,
      text:'hello',
      color:''
  }
  },
  mounted(){
    firebase.database().ref().child('courses').once('value', (coursess) => {

        coursess.forEach((course) => {
          console.log(course);
          this.courses.push({
            id: course.child('id').val(),
            courseimage:course.child('courseimage').val(),
            coursetitle: course.child('coursetitle').val(),
            coursedescription: course.child('coursedescription').val()
          })
        })
      })
  }
}
</script>
