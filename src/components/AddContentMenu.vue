<template>
<div class="cotainer">
<v-menu  top offset-y >
  <template v-slot:activator="{ on }">
    <v-btn class="ma-1" color="primary" dark text v-on="on">Add New</v-btn>

  </template>

  <v-list>
    <v-list-item color="primary">
      <v-btn class="ma-1" color="primary" dark text  :to="{ name: 'addpdf', params: { course_id: courseid }}">Add PDF</v-btn>

    </v-list-item>
    <v-list-item color="primary">
      <v-btn class="ma-1" color="primary" dark text  :to="{ name: 'addvideo', params: { course_id: courseid }}">Add Video</v-btn>
    </v-list-item>
    <v-list-item color="primary">
      <v-btn class="ma-1" color="primary" dark text  :to="{ name: 'addaudio', params: { course_id: courseid }}">Add Audio</v-btn>
    </v-list-item>
  </v-list>
</v-menu>
</div>
</template>
<script>
export default{
  name:'AddContentMenu',
  props: ['courseid']
}
</script>
