<style lang="less" scoped>

.local-spec-select-switch{
  display: inline-block;
  width: auto;
  height: 22px;
  position: relative;
  /deep/ .local-spec-select-switch-button{
    opacity: 1 !important;
  }
  .local-spec-select-switch-area{
    cursor: pointer !important;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

}
</style>

<template>
  <span class="local-spec-select-switch">
    <a-switch class="local-spec-select-switch-button" :checked="currentValue" :checkedChildren="checkedChildren" :unCheckedChildren="unCheckedChildren" :disabled="true" />
    <span class="local-spec-select-switch-area" @click="onChange"></span>
  </span>
</template>

<script>
export default {
  name: 'SelectSwitch',
  props: {
    value: {
      required: true
    },
    operate: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      open: false,
      currentValue: this.value._switch
    }
  },
  computed: {
    checkedChildren() {
      if (this.value._switch) {
        return this.value.label
      } else {
        return ''
      }
    },
    unCheckedChildren() {
      if (!this.value._switch) {
        return this.value.label
      } else {
        return ''
      }
    },
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.currentValue = this.value._switch
      }
    }
  },
  methods: {
    onChange() {
      if (this.operate) {
        this.$emit('change', !this.currentValue)
      }
    }
  }
}
</script>