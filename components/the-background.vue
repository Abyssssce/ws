<script>

export default {

  name: 'TheBackground',

  components: {},

  data () {
    return {}
  },

  computed: {},

  mounted () {},

  methods: {}

}

</script>

<template lang="pug">

.background-container

</template>

<style lang="stylus" scoped>

// steps = 3
// fps = 30
// time = (steps / fps)s

.background-container
  z-index 666
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  overflow hidden
  pointer-events none
  background-size auto
  background-repeat repeat
  background-image url('/noise/noise-1.png'),
    url('/noise/noise-2.png'),
    url('/noise/noise-3.png')

  .page_platform_desktop &
    animation noise 1s steps(60) infinite

@keyframes noise
  0%
    background-position  0% 0%,
                         0% 500%,
                         -400% 0%,
                         0% 700%
  100%
    background-position  300% 0%,
                         450% 50%,
                         0% 390%,
                         500% 0%

</style>
