<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">Изображение</v-card-title>
        <div v-if= dialog>
            <v-img :src= fileinfo.Text :alt= fileinfo.Path></v-img>
        </div>
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
      return this.$store.getters.getViewImag
    },
    fileinfo() {
      return this.$store.getters.getFileInfo
    }
  },

  methods: {
    close() {
      this.$store.dispatch("SetViewImag", false);
    }
  }
};
</script>