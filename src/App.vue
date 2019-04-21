<template>
  <v-app :class="[`nv-app-${activedMenu}`]" style="background-color: #fff;">
    <v-toolbar height="80px">
      <div class="nv-logo hidden-sm-and-down">
        <img src="home/logo.png"/>
        <span>NEW VIEW 株式会社</span>
      </div>
      <div class="nv-logo nv-logo-sm hidden-md-and-up">
        <img src="home/logo.png"/>
        <span>NEW VIEW 株式会社</span>
      </div>
      <!-- <v-toolbar-title class="headline text-uppercase">
        <span>new view 株式会社ホームページ</span>
      </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <ul class="nv-menus hidden-sm-and-down">
        <li
          v-for="(item, index) in menus"
          :key="index"
        >
          <a :class="{ 'active': activedMenu === item.name }" @click="handleClickMenu(item)">{{ item.name }}</a>
        </li>
      </ul>
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="handleDrawer"
      />
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      right
      temporary
      disable-resize-watcher
      style="width: 180px;"
    >
      <v-list>
        <v-list-tile
          v-for="(link, i) in menus"
          :key="i"
          :href="link.router"
        >
          <v-list-tile-title v-text="link.name" />
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer height="auto" color="grey darken-4">
      <v-layout justify-center row wrap py-5>
        <div class="mb-3">
          <v-btn
            v-for="(item, index) in menus"
            :key="index"
            color="white"
            flat
            round
            @click="$router.push(item.router)"
          >
            {{ item.name }}
          </v-btn>
        </div>
        <v-flex
          grey
          darken-4
          pt-5
          text-xs-center
          white--text
          xs12
        >
          &copy;2019 — <strong>NEWVIEW</strong>
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
        router: '/'
      }, {
        name: 'WORKS',
        router: '/nvworks'
      },
      // {
      //   name: 'AGENT',
      //   url: '/agent/'
      // },
      {
        name: 'COMPANY',
        router: '/nvcompany'
      },
      {
        name: 'CONTACT',
        router: '/nvcontact'
      }],
      activedMenu: 'home',
      drawer: false
    }
  },
  computed: {
    routePath () {
      return this.$route.path
    }
  },
  watch: {
    routePath (newVal) {
      for (let item of this.menus) {
        if (newVal.includes(item.router)) this.activedMenu = item.name
      }
    }
  },
  methods: {
    handleClickMenu (item) {
      this.activedMenu = item.name
      this.$router.push(item.router)
    },
    handleDrawer () {
      this.drawer = !this.drawer
    }
  },
  mounted () {
    for (let item of this.menus) {
      if (location.pathname.includes(item.router)) this.activedMenu = item.name
    }
  }
}
</script>
