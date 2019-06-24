<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="1900">
      <v-card>
        <v-card-title class="headline">Текст документа</v-card-title>
        <v-card-text>{{fileinfo.Text}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="close">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({}),

  computed: {
    dialog() {
      return this.$store.getters.getViewText
    },
    fileinfo() {
      return this.$store.getters.getFileInfo
    }
  },

  methods: {
    close() {
      this.$store.dispatch("SetViewText", false)
    }
  }
};
</script>