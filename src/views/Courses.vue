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
        <v-card>
    <v-list-item
      v-for="course in courses"
      :key="course.id"

    >
      <v-list-item-content>
        <v-list-item-title v-text="course.coursetitle"></v-list-item-title>
        <v-img
      v-bind:src="course.courseimage"
     lazy-src="https://picsum.photos/id/11/10/6"
     aspect-ratio="1"
     class="grey lighten-2"
     max-width="100"
     max-height="100"
   >
   <h6>{{course.coursedescription}}</h6>
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
      </v-list-item-content>
    </v-list-item>
  </v-card>
  </v-list>


</v-container>

</template>
<script>
import { uuid } from 'vue-uuid';
import firebase from 'firebase';
export default{
  name:'courses',

  methods:{

  },
  data(){
    return{
      courses:[]
  }
  },
  mounted(){
    firebase.database().ref().child('courses').once('value', (coursess) => {

        coursess.forEach((course) => {

          this.courses.push({
            id: course.id,
            courseimage:course.child('courseimage').val(),
            coursetitle: course.child('coursetitle').val(),
            coursedescription: course.child('coursedescription').val()
          })
        })
      })
  }
}
</script>
