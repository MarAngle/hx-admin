<style lang="less" scoped>
.number-area{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}
</style>

<template>
  <div class="number-area">
    <NumberChange :data="data" :color="color" :time="time" :decimal="decimal" :comma="comma" :format="format" />
    <NumberUnit :unit="unit" :unitOption="unitOption" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NumberChange from './NumberChange.vue'
import NumberUnit from './NumberUnit.vue'

export default defineComponent({
  name: 'NumberArea',
  components: {
    NumberChange,
    NumberUnit
  },
  props: {
    data: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    time: {
      type: Number,
      required: false,
      default: 800
    },
    decimal: {
      type: Number,
      required: false,
      default: 0
    },
    comma: {
      type: String,
      required: false,
      default: ','
    },
    format: {
      type: Function,
      required: false,
      default: undefined
    },
    unit: {
      type: String,
      required: true
    },
    unitOption: {
      type: Object,
      required: false,
      default: undefined
    }
  }
})
</script>
