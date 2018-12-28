<template>
  <v-layout row wrap align-start>
    <v-flex
      v-for="(item, index) in images"
      :key="index"
      xs12 md4 px-4 py-4 class="nv-works-item"
    >
      <v-card class="elevation-0 transparent">
        <v-img :src="item.filePath" height="194px" @click="previewImage(index)"></v-img>
        <v-card-title primary-title class="px-0">{{ item.title }}</v-card-title>
      </v-card>
    </v-flex>

    <v-dialog
      v-model="dialog"
      scrollable
      content-class="image-pre-dialog"
    >
      <v-img :src="previewSrc" contain @click="dialog = false"></v-img>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from '@/tools/axios'
export default {
  data () {
    return {
      dialog: false,
      previewSrc: '',
      images: []
    }
  },
  methods: {
    previewImage (index) {
      this.previewSrc = this.imgs[index].src
      this.dialog = true
    }
  },
  async created () {
    this.images = await axios.get('/gateway/fetchWorkImage')
  }
}
</script>
