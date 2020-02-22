import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toast:false,
    toasttitle:null,
    toastcolor:null,
    loading:false,
  },
  mutations: {

    showtoast(state,payload){
      state.toast=true;
      state.toasttitle=payload.toasttitle;
      state.toastcolor=payload.toastcolor;


    },
    closetoast(state){
      state.toast=false
    },
    showloading(state){
      state.loading=true;
    },
    closeloading(state){
      state.loading=false;
    }
  },
  actions: {
    showtoast (context, payload) {
     context.commit('showtoast', payload)
    },
    closetoast(context){
     context.commit('closetoast')
   },
   showloading(context){
    context.commit('showloading')
  },
  closeloading(context){
    context.commit('closeloading')
  }
  },
  modules: {}
});
