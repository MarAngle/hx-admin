<style lang="less" scoped>

.number-unit{
  display: inline-block;
}
</style>

<template>
  <span class="number-unit" :style="unitStyle">{{ unit }}</span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberUnit',
  props: {
    unit: {
      type: String,
      required: true
    },
    unitOption: {
      type: Object,
      required: false,
      default: undefined
    }
  },
  computed: {
    unitStyle() {
      const unitStyle = {}
      if (this.unitOption) {
        if (this.unitOption.color) {
          unitStyle.color = this.unitOption.color
        }
        if (this.unitOption.fontSize) {
          unitStyle.fontSize = this.unitOption.fontSize + 'px'
        }
        if (this.unitOption.lineHeight) {
          unitStyle.lineHeight = this.unitOption.lineHeight + 'px'
        }
        if (this.unitOption.top) {
          unitStyle.transform = `translateY(${this.unitOption.top}px)`
        }
        if (this.unitOption.left) {
          unitStyle.marginLeft = this.unitOption.left + 'px'
        }
      }
      return unitStyle
    }
  }
})
</script>
