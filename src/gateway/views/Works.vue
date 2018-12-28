<template>
  <section class="nv-works">
    <v-layout
      column
      wrap
      align-center
    >
      <v-flex class="mt-2 mb-4" style="width: 100%;">
        <v-tabs
          slot="extension"
          v-model="tabs"
          fixed-tabs
          color="transparent"
          icons-and-text
        >
          <v-tabs-slider color="black"></v-tabs-slider>
          <v-tab href="#image">
            IMAGE
            <v-icon x-large>image</v-icon>
          </v-tab>
          <v-tab href="#video">
            VIDEO
            <v-icon x-large>videocam</v-icon>
          </v-tab>
        </v-tabs>
      </v-flex>
      <!-- <v-flex xs12 sm4 class="mt-5 mb-4">
        <div class="nv-home-title">WORKS</div>
      </v-flex> -->
      <v-flex xs12 style="width: 1200px;">
        <v-container grid-list-xl v-show="tabs === 'image'">
          <works-image></works-image>
        </v-container>
        <v-container grid-list-xl v-show="tabs === 'video'">
          <v-layout row wrap align-center>
            <v-flex
              v-for="index in 3" :key="index"
              xs12 md4 px-4 py-5 class="nv-works-item">
              <v-card class="elevation-0 transparent">
                <!-- <v-img src="../home-works/01.jpg"></v-img> -->
                <video src="0712_ECME_KANPAKE.mp4" controls style="width: 344px;">
                  您的浏览器不支持 video 标签。
                </video>
                <v-card-title primary-title class="px-0">【CM】株式会社 New View「ビデオリリースのNew View」篇</v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex class="mt-2 mb-4" style="width: 1200px; text">
        <div class="text-xs-center">
          <v-pagination
            v-model="page"
            :length="4"
          ></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import WorksImage from '@/components/works-image'

export default {
  components: { WorksImage },
  data () {
    return {
      tabs: 'image',
      page: 1
    }
  }
}
</script>
