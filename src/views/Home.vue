<template>
  <div class="nv-home">
    <v-parallax src="/home/top_bk.jpg" height="660" class="hidden-sm-and-down"></v-parallax>
    <v-parallax src="/home/top_bk.jpg" height="380" class="hidden-md-and-up"></v-parallax>
    <!-- <v-carousel height="800px" hide-controls style="background: #ccc;">
      <v-carousel-item
        v-for="(item, index) in carousels"
        :key="index"
        :src="item.smDistPath"
      ></v-carousel-item>
    </v-carousel> -->
    <section class="nv-home-works my-5">
      <v-layout
        column
        wrap
        align-center
      >
        <v-flex xs12 sm4 class="mt-5 mb-4">
          <div class="nv-title">WORKS</div>
        </v-flex>
        <v-flex xs12 style="max-width: 1200px;">
          <v-container grid-list-xl>
            <v-layout row wrap align-start>
              <v-flex
                v-for="(item, index) in images"
                :key="`photo-${index}`"
                xs12 sm6 mb4 px-4 py-4
                class="nv-works-item photo"
              >
                <v-img :src="item.distPath" height="194px" @click="previewImage(item.distPath)"></v-img>
                <div class="nv-works-item-title">{{ item.title }}</div>
              </v-flex>

              <v-dialog
                v-model="dialog"
                scrollable
                content-class="image-pre-dialog"
              >
                <v-img :src="previewSrc" contain @click="dialog = false"></v-img>
              </v-dialog>

              <v-flex
                v-for="(item, index) in videos"
                :key="`video-${index}`"
                xs12 sm6 mb4 px-4 py-4
                class="nv-works-item"
              >
                <iframe :src="item.src" style="width: 100%; height: 190px;" allowfullscreen></iframe>
                <div class="nv-works-item-title">{{ item.title }}</div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 sm4 class="mt-5 mb-4 px-4" style="width: 100%;">
          <a class="nv-page-button" @click="$router.push('/nvworks')">もっと詳しくみる</a>
        </v-flex>
      </v-layout>
    </section>
    <!-- <section>
      <v-parallax src="/home/01.jpg" height="400">
        <v-layout
          column
          align-center
          justify-center
          class="white--text"
        >
        </v-layout>
      </v-parallax>
    </section>
    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex xs12 sm4 class="mt-5 mb-4">
          <div class="nv-title">COMPANY</div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large>color_lens</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Material Design</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large>flash_on</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Fast development</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large>build</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Completely Open Sourced</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section> -->

    <section>
      <v-parallax src="/home/02.jpg" height="400" class="hidden-sm-and-down"></v-parallax>
      <v-parallax src="/home/02.jpg" height="280" class="hidden-md-and-up"></v-parallax>
    </section>

    <section>
      <v-layout column wrap align-center>
        <v-flex xs12 sm4 class="mt-5 mb-4">
          <div class="nv-title mt-3">CONTACT</div>
        </v-flex>
        <v-flex xs12 sm4>
          <v-list class="transparent mt-4">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>〒166-0002東京都杉並区高円寺北1-21-5 4F-1</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <!-- <v-list-tile>
              <v-list-tile-action>
                <v-icon>phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>0755-86518755 / 86518753</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> -->
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>info@newview.co.jp</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex xs12 sm4 class="mt-5 mb-4 px-4" style="width: 100%;">
          <a class="nv-page-button" @click="$router.push('/nvcontact')">もっと詳しくみる</a>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
import axios from '@/tools/axios'
export default {
  data () {
    return {
      carousels: [],
      images: [],
      videos: [],
      dialog: false,
      previewSrc: ''
    }
  },
  methods: {
    loadImages (images) {
      for (let item of images) {
        const img = new Image()
        img.onload = () => {
          img.onload = null
          item.smDistPath = item.distPath
        }
        img.src = item.distPath
      }
    },
    previewImage (distPath) {
      this.previewSrc = distPath
      this.dialog = true
    }
  },
  async mounted () {
    this.carousels = (await axios.get('/gateway/fetchCarousel', { params: { pageSize: 99 } })).data
    this.images = (await axios.get('/gateway/fetchWorkImage', { params: { pageSize: 3 } })).data
    this.videos = (await axios.get('/gateway/fetchWorkVideo', { params: { pageSize: 3 } })).data
    this.loadImages(this.carousels)
    this.loadImages(this.images)
  }
}
</script>
