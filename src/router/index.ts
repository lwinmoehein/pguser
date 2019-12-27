import Vue from "vue";
import VueRouter from "vue-router";
import Posts from '../views/Posts.vue';
import Courses from '../views/Courses.vue';
import Favorites from '../views/Favourites.vue';
import AddNewCourse from '../views/AddNewCourse.vue'
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts
    },
    {
      path: '/courses',
      name: 'courses',
      component: Courses
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/addcourse',
      name: 'addcourse',
      component: AddNewCourse
    },
  ]
});
