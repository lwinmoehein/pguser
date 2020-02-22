<template>
  <div class="container">

  </div>
</template>
<script>
import store from '../store/';
import * as type from '../store/mutationTypes/types';


  export default {
    components : {

    },
    mounted(){
      store.dispatch({
        type: type.ShowToast,
        toasttitle: "hello guys",
        toastcolor:"blue"
      })
    }
  }
</script>
