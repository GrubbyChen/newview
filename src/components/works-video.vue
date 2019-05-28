<template>
  <v-layout row wrap align-start style="max-width: 1200px; margin: auto;">
    <v-flex
      v-for="(item, index) in videos"
      :key="index"
      xs12 sm6 md4 px-4 py-4
      class="nv-works-item"
    >
      <iframe :src="item.src" style="width: 100%; height: 190px;" allowfullscreen></iframe>
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
  </v-layout>
</template>

<script>
import axios from '@/tools/axios'
export default {
  data () {
    return {
      videos: [],
      page: 1,
      pageSize: 9,
      totalPage: 1
    }
  },
  methods: {
    async fetch (page = 1) {
      const result = await axios.get('/gateway/fetchWorkVideo', {
        params: {
          page,
          pageSize: this.pageSize
        }
      })
      this.videos = result.data
      this.totalPage = result.totalPage
    },
    handleChangePagination (page) {
      this.fetch(page)
    }
  },
  async created () {
    this.fetch()
  }
}
</script>
