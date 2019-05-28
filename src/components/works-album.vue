<template>
  <v-layout row wrap align-start style="max-width: 1200px; margin: auto;">
    <v-flex
      v-for="(item, index) in albums"
      :key="index"
      xs12 sm6 md4 px-4 py-4
      class="nv-works-item album"
    >
        <div class="album">
          <v-img :src="item.distPath" :lazy-src="item.smDistPath" height="190px" @click="previewAlbum(item)"></v-img>
        </div>
        <div class="album-pseudo1"></div>
        <div class="album-pseudo2"></div>
        <div class="nv-works-item-title">{{ item.title }}</div>
    </v-flex>

    <v-flex xs12 sm12 md12 v-show="totalPage > 1">
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
      content-class="alubm-pre-dialog"
    >
      <ul @click="dialog = false">
        <li v-for="(item, index) in photos" :key="index">
          <img :src="item.distPath" />
        </li>
      </ul>
    </v-dialog>
  </v-layout>
</template>

<script>
// import AlbumItem from '@/components/album-item'
import axios from '@/tools/axios'

export default {
  // components: { AlbumItem },
  data () {
    return {
      dialog: false,
      previewSrc: '',
      albums: [],
      photos: [],
      page: 1,
      pageSize: 9,
      totalPage: 1
    }
  },
  methods: {
    async fetch (page = 1) {
      const result = await axios.get('/gateway/fetchWorkAlbum', {
        params: {
          page,
          pageSize: this.pageSize
        }
      })
      this.albums = result.data
      this.totalPage = result.totalPage
    },
    handleChangePagination (page) {
      this.fetch(page)
    },
    previewAlbum (album) {
      this.photos = album.children
      this.dialog = true
    }
  },
  created () {
    this.fetch()
  }
}
</script>
