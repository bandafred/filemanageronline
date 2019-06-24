<template>
  <div>
    <v-card-title>
      <v-toolbar-title>Файлы в папке {{path}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Поиск"
        single-line
        hide-details
        color="cyan darken-3"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="filesInfo"
      :search="search"
      :loading="progress"
      rows-per-page-text="Строк на странице"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.Names }}</td>
        <td class="text-xs-left">{{ props.item.Size }} Mb</td>
        <td class="text-xs-left">{{ props.item.ModificationDate }}</td>
        <td>
          <v-tooltip bottom v-if="props.item.TypeFiles !== 2">
            <v-btn  slot="activator" color="blue darken-1" dark fab small @click="view(props.item)">
              <v-icon>description</v-icon>
            </v-btn>
            <span>Просмотр</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              color="red"
              dark
              fab
              small
              @click="deleted(props.item)"
            >
              <v-icon>delete_forever</v-icon>
            </v-btn>
            <span>Удалить файл</span>
          </v-tooltip>
        </td>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >По вашему запросу "{{ search }}" ни чего не найдено.</v-alert>
    </v-data-table>
    <v-btn color="info" @click="uploadFiles" :loading="progress">Добавить файл</v-btn>
    <input style="display: none" type="file" id="file" ref="file" v-on:change="submitFile()">
    <TextView></TextView>
    <ImageView></ImageView>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Вы хотите удалить {{selectedItem.Names}}?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Отмена</v-btn>
            <v-btn color="red darken-1" :loading="deleting" flat @click="deletItem">Подтвердить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import TextView from "@/components/TextView";
import ImageView from "@/components/ImageView";

export default {
  data: () => ({
    dialog: false,
    search: "",
    progress: false,
    deleting: false,
    selectedItem: '',
    headers: [
      { text: "Имя файла", value: "Names" },
      { text: "Размер", value: "Size" },
      { text: "Дата модификации", value: "ModificationDate" }
    ]
  }),

  components: {
    TextView,
    ImageView
  },

  computed: {
    path() {
      return "../" + this.$store.getters.getFilesPath;
    },
    filesInfo() {
      return this.$store.getters.getFilesInfo;
    }
  },

  watch: {},

  created() {
    this.$store.dispatch("GetFilesPath");
    this.$store.dispatch("GetFilesInfo");
  },

  methods: {
    uploadFiles() {
      this.$refs.file.click();
    },
    async submitFile() {
      this.progress = true;
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);

      await this.$store.dispatch("UploadFile", formData);
      this.progress = false;
    },
    deleted(item) {
      this.dialog = true;
      this.selectedItem = item;
    },
    async deletItem(item) {
      this.deleting = true;
      await this.$store.dispatch("DeleteFile", this.selectedItem.Path);
      await this.$store.dispatch("GetFilesInfo");
      this.deleting = false;
      this.dialog = false;
    },
    view(item) {
      switch (item.TypeFiles) {
        case 0:
          this.$store.dispatch("SetViewImag", true);
          break;
        case 1:
          this.$store.dispatch("SetViewText", true);
          break;
        case 2:
          alert("No");
          break;
      }
      this.$store.dispatch("SetFileInfo", item);
    }
  }
};
</script>