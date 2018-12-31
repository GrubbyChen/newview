<template>
  <v-layout row wrap align-start>
    <v-flex
      v-for="(item, index) in images"
      :key="index"
      xs12 md4 px-4 py-4 class="nv-works-item"
    >
      <v-card class="elevation-0 transparent">
        <v-img :src="item.smDistPath" height="194px" @click="previewImage(item.distPath)"></v-img>
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
    previewImage (distPath) {
      this.previewSrc = distPath
      this.dialog = true
    }
  },
  async created () {
    this.images = await axios.get('/gateway/fetchWorkImage')
    for (let item of this.images) {
      const img = new Image()
      img.onload = () => {
        img.onload = null
        item.smDistPath = item.distPath
      }
      img.src = item.distPath
    }
  }
}
</script>
