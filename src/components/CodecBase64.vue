<template>
  <div class="hello">
    <h1>Base64</h1>
    <span>mode {{mode}}</span>
    <textarea class="plain-text" v-model="plain" v-on:focus="onFocusChange(true)" v-on:input="onPlainChange"/>
    <textarea class="base64-text" v-model="base64" v-on:focus="onFocusChange(false)" v-on:input="onBase64Change"/>
    <span v-if="isBase64CodeInvalid">invalid base64 string</span>
  </div>
</template>

<script>
// import {byteCount} from '@/utils/chars'
const Base64 = require('js-base64').Base64

export default {
  name: 'CodecBase64',

  data () {
    return {
      plain: '',
      base64: '',

      isEncodeMode: true,
      isBase64CodeInvalid: false
    }
  },

  created () {
    console.log('created')
  },
  mounted () {
    this.plain = '123'
    this.$set(this, '123')
    console.log('mounted')
  },
  updated () {
    console.log('updated')
  },
  computed: {
    mode: function () {
      return this.isEncodeMode ? 'ENCODE' : 'DECODE'
    }
  },
  methods: {
    onFocusChange: function (isEncodeMode) {
      this.isEncodeMode = isEncodeMode
      console.log('onFocusChange called, mode changed to ' + this.mode)
    },
    onPlainChange: function () {
      if (this.isEncodeMode) {
        console.log('onPlainChange called, current plain value is : ' + this.plain + ', mode is : ' + this.mode)
        this.base64 = Base64.encode(this.plain)
        this.isBase64CodeInvalid = false
      }
    },
    onBase64Change: function () {
      if (!this.isEncodeMode) {
        console.log('onBase64Change called, current plain value is : ' + this.plain + ', mode is : ' + this.mode)
        try {
          this.plain = Base64.decode(this.base64)
          console.log('correct base64 string "' + this.base64 + '"' + '-> "' + this.plain.length + '"')
          this.isBase64CodeInvalid = false
        } catch (ex) {
          console.log('bad base64 string "' + this.base64 + '"')
          this.plain = ''
          this.isBase64CodeInvalid = true
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
