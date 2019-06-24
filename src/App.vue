<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Тестовое задание</span>
        <span class="font-weight-light"> файловый менеджер</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <FileManager/>
    </v-content>
  </v-app>
</template>

<script>
import FileManager from './components/FileManager'

export default {
  name: 'App',
  components: {
    FileManager
  },
  data () {
    return {
    }
  }
}
</script>