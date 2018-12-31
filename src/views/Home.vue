<template>
  <div class="nv-home">
    <v-carousel height="800px" hide-controls style="background: #ccc;">
      <v-carousel-item
        v-for="(item, index) in carousels"
        :key="index"
        :src="item.smDistPath"
      ></v-carousel-item>
    </v-carousel>
    <section class="nv-home-works my-5">
      <v-layout
        column
        wrap
        align-center
      >
        <v-flex xs12 sm4 class="mt-5 mb-4">
          <div class="nv-title">WORKS</div>
        </v-flex>
        <v-flex xs12 style="width: 1200px;">
          <v-container grid-list-xl>
            <v-layout row wrap align-start>
              <v-flex
                v-for="(item, index) in images" :key="index"
                xs12 md4 px-4 py-5 class="nv-works-item">
                <v-card class="elevation-0 transparent">
                  <v-img :src="item.distPath" height="194px"></v-img>
                  <v-card-title primary-title class="px-0">{{ item.title }}</v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 sm4 class="mt-5 mb-4">
          <a class="nv-page-button" @click="$router.push('/nvworks')">もっと詳しくみる</a>
        </v-flex>
      </v-layout>
    </section>
    <section>
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
    </section>

    <section>
      <v-parallax src="/home/02.jpg" height="400">
        <v-layout column align-center justify-center>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout column wrap align-center>
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="nv-title my-3">CONTACT</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
              </v-card-text>
              <v-list class="transparent">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>location_on</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>深圳市宝安区留仙大道2号</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>0755-86518755 / 86518753</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>sales@frontsurf.com</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 class="mt-5 mb-4">
            <a class="nv-page-button" href="/contact/">もっと詳しくみる</a>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>
import axios from '@/tools/axios'
export default {
  data () {
    return {
      carousels: [],
      images: []
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
    }
  },
  async mounted () {
    this.carousels = await axios.get('/gateway/fetchCarousel')
    this.images = (await axios.get('/gateway/fetchWorkImage')).slice(0, 6)
    this.loadImages(this.carousels)
    this.loadImages(this.images)
  }
}
</script>
