<template>
  <li>
    <v-img :src="image.distPath" ref="image"></v-img>
  </li>
</template>

<script>

export default {
  props: {
    image: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    loadImage () {
      const img = new Image()
      img.onload = () => {
        console.log('123')
        console.log(img.style)
        console.log(this.$refs.image.image)
        console.log(this.$refs.image.image.clientHeight)
        // this.$nextTick(() => {
        //   console.log(img.clientHeight)
        // })
      }
      img.src = this.image.distPath
    }
  },
  mounted () {
    this.loadImage()
  }
}
</script>
