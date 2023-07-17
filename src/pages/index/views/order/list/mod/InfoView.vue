<style scoped>

</style>
<template>
  <div class="order-info-view" v-if="data" >
  </div>
</template>

<script>

export default {
  name: `InfoView`,
  data () {
    return {
      data: null
    }
  },
  props: {
    maindata: {
      type: Object,
      required: true
    }
  },
  methods: {
    show() {
      
    }
  }
}
</script>
