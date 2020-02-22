<template>
  <div>

    <v-navigation-drawer
      app
      fixed
      v-model="showMenu"

    >
      <v-list dense>
        <v-list-item @click="courses">
          <v-list-item-action>
          <v-icon material>mdi-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Courses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="addcourse">
          <v-list-item-action>
           <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Courses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      fixed
      dark
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>

      <v-toolbar-title>Knowledge World<v-icon dark>mdi-book</v-icon>(free Knowledge)
</v-toolbar-title>

    </v-app-bar>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  @Component
  export default class TopToolbar extends Vue {
    showMenu: boolean = false;
    toggleMenu(): void {
      this.showMenu = !this.showMenu;
    }
    courses(): void {
      this.$router.replace('courses');

    }
    addcourse(): void {
      this.$router.replace('addcourse');

    }
  }
</script>
