
<template>
  <span v-if="!format" class="comma-number" :class="currentClass" >{{ currentData }}</span>
  <span v-else class="comma-number" :class="currentClass" >{{ format(currentData) }}</span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CommaNumber',
  props: {
    data: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    decimal: {
      type: Boolean,
      required: false,
      default: false
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
    }
  },
  data() {
    return {
    }
  },
  computed: {
    currentClass() {
      if (this.color) {
        return 'local-main-color-' + this.color
      } else {
        return ''
      }
    },
    currentData() {
      return this._func.parseNumberByComma(this.data, this.comma, this.decimal)
    }
  }
})
</script>
