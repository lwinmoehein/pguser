<template>
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

</template>
<script>
import store from '../store/';
import * as type from '../store/mutationTypes/types';
import { mapState } from 'vuex';

export default {
  computed: mapState({
      loading: state => state.loading,
})
}
</script>
