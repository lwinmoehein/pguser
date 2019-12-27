import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont/dist/material-design-icons.css"
import { Ripple } from 'vuetify/lib/directives'
Vue.use(Vuetify, {
  // other stuff
  directives: {
    Ripple
  }
})
export default new Vuetify({});
