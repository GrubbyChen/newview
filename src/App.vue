<template>
  <v-app :class="[`nv-app-${activedMenu}`]" style="background-color: #fff;">
    <v-toolbar height="80px">
      <v-toolbar-title class="headline text-uppercase">
        <span>new view 株式会社ホームページ</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <ul class="nv-menus">
        <li
          v-for="(item, index) in menus"
          :key="index"
        >
          <a :href="item.url">{{ item.name }}</a>
        </li>
      </ul>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer height="auto" color="grey darken-4">
      <v-layout justify-center row wrap pt-4>
        <v-btn
          v-for="(item, index) in menus"
          :key="index"
          color="white"
          flat
          round
          @click="gotoRouter(item.url)"
        >
          {{ item.name }}
        </v-btn>
        <v-flex
          grey
          darken-4
          pt-5
          pb-4
          text-xs-center
          white--text
          xs12
        >
          &copy;2018 — <strong>NEWVIEW</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      menus: [{
        name: 'HOME',
        url: '/'
      }, {
        name: 'WORKS',
        url: '/nvworks/'
      },
      // {
      //   name: 'AGENT',
      //   url: '/agent/'
      // },
      {
        name: 'COMPANY',
        url: '/company/'
      },
      {
        name: 'CONTACT',
        url: '/contact/'
      }],
      activedMenu: 'home'
    }
  },
  methods: {
    gotoRouter (url) {
      location.href = url
    }
  },
  mounted () {
    for (let item of this.menus) {
      if (location.pathname === item.url) this.activedMenu = item.name.toLocaleLowerCase()
    }
  }
}
</script>
