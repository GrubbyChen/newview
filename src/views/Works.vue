<template>
  <div class="nv-works">
    <section>
      <v-layout column wrap align-center>
        <v-flex style="width: 100%;">
          <v-img src="/works/top_bk.jpg" lazy-src="/works/sm_top_bk.jpg" width="100%" height="480px" class="hidden-sm-and-down"></v-img>
          <v-img src="/works/top_bk.jpg" lazy-src="/works/sm_top_bk.jpg" width="100%" height="300px" class="hidden-md-and-up"></v-img>
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
    <section ref="workTabs">
      <v-tabs
        slot="extension"
        v-model="activeTab"
        fixed-tabs
        color="transparent"
        icons-and-text
        class="nv-works-tabs px-4 py-4"
      >
        <v-tab href="#photo" @click="changeTabs('photo')">PHOTO</v-tab>
        <v-tab href="#album" @click="changeTabs('album')">ALBUM</v-tab>
        <v-tab href="#video" @click="changeTabs('video')">VIDEO</v-tab>
      </v-tabs>
    </section>
    <works-photo v-if="activeTab === 'photo'"></works-photo>
    <works-album v-if="activeTab === 'album'"></works-album>
    <works-video v-if="activeTab === 'video'"></works-video>
  </div>
</template>

<script>
import WorksPhoto from '@/components/works-photo'
import WorksAlbum from '@/components/works-album'
import WorksVideo from '@/components/works-video'
import { getOffset, scroll } from '@/tools/utils'

export default {
  components: { WorksPhoto, WorksVideo, WorksAlbum },
  data () {
    return {
      topbkSrc: '/works/sm_top_bk.jpg',
      activeTab: 'photo',
      page: 1
    }
  },
  computed: {
    routePath () {
      return this.$route.path
    }
  },
  methods: {
    changeTabs (type) {
      this.$router.push({ name: `works-${type}` })
      const offset = getOffset(this.$refs.workTabs)
      scroll(document.documentElement, offset.top)
    }
  },
  created () {
    if (this.routePath.includes('/photo')) {
      this.activeTab = 'photo'
    }
    if (this.routePath.includes('/video')) {
      this.activeTab = 'video'
    }
    if (this.routePath.includes('/album')) {
      this.activeTab = 'album'
    }
  }
}
</script>
