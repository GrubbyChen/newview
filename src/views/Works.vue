<template>
  <div class="nv-works">
    <section>
      <v-layout column wrap align-center>
        <v-flex style="width: 100%;">
          <v-img src="../works/top_bk.jpg" width="100%" height="480px"></v-img>
        </v-flex>
      </v-layout>
    </section>
    <section class="pt-4">
      <v-layout column wrap align-center>
        <v-flex xs12 sm4 my-5>
          <div class="nv-title">WORKS</div>
        </v-flex>
      </v-layout>
    </section>
    <section>
      <v-tabs
        slot="extension"
        v-model="tabs"
        fixed-tabs
        color="transparent"
        icons-and-text
        class="nv-works-tabs py-4"
      >
        <v-tabs-slider color="black"></v-tabs-slider>
        <v-tab href="#image">IMAGE</v-tab>
        <!-- <v-tab href="#photo">PHOTO</v-tab> -->
        <v-tab href="#video">VIDEO</v-tab>
      </v-tabs>
    </section>
    <v-layout
      column
      wrap
      align-center
    >
      <v-flex xs12 style="width: 1200px;">
        <v-container grid-list-xl v-show="tabs === 'image'">
          <works-image></works-image>
        </v-container>
        <!-- <v-container grid-list-xl v-show="tabs === 'photo'">
          <works-image></works-image>
        </v-container> -->
        <v-container grid-list-xl v-show="tabs === 'video'">
          <v-layout row wrap align-start>
            <v-flex
              v-for="(item, index) in videos" :key="index"
              xs12 md4 px-4 py-5 class="nv-works-item">
              <v-card class="elevation-0 transparent">
                <iframe :src="item.src" style="width: 100%; height: 190px;" allowfullscreen></iframe>
              </v-card>
              <v-card-title primary-title class="px-0">{{ item.title }}</v-card-title>
            </v-flex>
            <!-- <v-flex
              v-for="(item, index) in videos" :key="index"
              xs12 md4 px-4 py-5 class="nv-works-item">
              <v-card class="elevation-0 transparent">
                <video :src="item.distPath" controls style="width: 344px;">
                  您的浏览器不支持 video 标签。
                </video>
                <v-card-title primary-title class="px-0">{{ item.title }}</v-card-title>
              </v-card>
            </v-flex> -->
          </v-layout>
        </v-container>
      </v-flex>
      <!-- <v-flex class="mt-2 mb-5" style="width: 1200px; text">
        <div class="text-xs-center">
          <v-pagination
            v-model="page"
            :length="4"
          ></v-pagination>
        </div>
      </v-flex> -->
    </v-layout>
  </div>
</template>

<script>
import axios from '@/tools/axios'
import WorksImage from '@/components/works-image'

export default {
  components: { WorksImage },
  data () {
    return {
      tabs: 'image',
      page: 1,
      videos: []
    }
  },
  async mounted () {
    this.videos = await axios.get('/gateway/fetchWorkVideo')
  }
}
</script>
