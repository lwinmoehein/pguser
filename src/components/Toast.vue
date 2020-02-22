<template>
  <div class="cotainer">
    <v-snackbar
   v-model="snackbar"
   :bottom="y === 'bottom'"
   :color="toastcolor"
   :left="x === 'left'"
   :multi-line="mode === 'multi-line'"
   :right="x === 'right'"
   :timeout="timeout"
   :top="y === 'top'"
   :vertical="mode === 'vertical'"
    >
   {{ toasttext }}
   <v-btn
     dark
     text
     @click="closeToast"
   >
     Close
   </v-btn>
 </v-snackbar>
 <button class="button is-primary" v-on:click="showToast()">ShowToast</button>

  </div>
</template>
<script>
import store from '../store/';
import * as type from '../store/mutationTypes/types';
import { mapState } from 'vuex';

export default {
  computed: mapState({
      snackbar: state => state.toast,
      toasttext:state=>state.toasttitle,
      toastcolor:state=>state.toastcolor
}),
methods: {
    showToast(){
      store.dispatch({
        type: type.ShowToast,
        toasttitle: "hello guys",
        toastcolor:"blue"
      })
    },
    closeToast(){
      store.dispatch({
        type: type.CloseToast,
      })
    }
}
}
</script>
