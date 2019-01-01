<template>
  <v-layout row wrap align-start style="width: 1200px; margin: auto;">
    <v-flex
      v-for="(item, index) in images"
      :key="index"
      xs12 md4 px-4 py-4
      class="nv-works-item photo"
    >
      <v-card class="elevation-0 transparent">
        <v-img :src="item.distPath" :lazy-src="item.smDistPath" height="194px" @click="previewImage(item.distPath)"></v-img>
        <v-card-title primary-title class="px-0">{{ item.title }}</v-card-title>
      </v-card>
    </v-flex>

    <v-flex xs12 mb-4>
      <div class="text-xs-center">
        <v-pagination
          v-model="page"
          :total-visible="9"
          :length="totalPage"
          @input="handleChangePagination"
        ></v-pagination>
      </div>
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
      images: [],
      page: 1,
      pageSize: 9,
      totalPage: 1
    }
  },
  methods: {
    async fetch (page = 1) {
      const result = await axios.get('/gateway/fetchWorkImage', {
        params: {
          page,
          pageSize: this.pageSize
        }
      })
      this.images = result.data
      this.totalPage = result.totalPage
    },
    handleChangePagination (page) {
      this.fetch(page)
    },
    previewImage (distPath) {
      this.previewSrc = distPath
      this.dialog = true
    }
  },
  async created () {
    this.fetch()
  }
}
</script>
