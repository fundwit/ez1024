import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  /**
   * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
   * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
   *
   * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)                             一个字节
   * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)             两个字节
   * 000800 - 00D7FF
   * 00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz           三个字节
   * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
   *
   * 注: Unicode在范围 D800-DFFF 中不存在任何字符
   * {@link http://zh.wikipedia.org/wiki/UTF-8}
   *
   * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
   * 000000 - 00FFFF  两个字节
   * 010000 - 10FFFF  四个字节
   *
   * {@link http://zh.wikipedia.org/wiki/UTF-16}
   * @param  {String} str
   * @param  {String} charset utf-8, utf-16
   * @return {Number}
   */
  byteCount: function (str, charset) {
    let total = 0
    let charCode
    let i
    let len
    charset = charset ? charset.toLowerCase() : ''
    if (charset === 'utf-16' || charset === 'utf16') {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode <= 0xffff) {
          total += 2
        } else {
          total += 4
        }
      }
    } else {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode <= 0x007f) {
          total += 1
        } else if (charCode <= 0x07ff) {
          total += 2
        } else if (charCode <= 0xffff) {
          total += 3
        } else {
          total += 4
        }
      }
    }
    return total
  },

  stringToByte: function (str) {
    const bytes = new Int8Array()
    let c
    const len = str.length
    for (let i = 0; i < len; i++) {
      c = str.charCodeAt(i)
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0)
        bytes.push(((c >> 12) & 0x3F) | 0x80)
        bytes.push(((c >> 6) & 0x3F) | 0x80)
        bytes.push((c & 0x3F) | 0x80)
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0)
        bytes.push(((c >> 6) & 0x3F) | 0x80)
        bytes.push((c & 0x3F) | 0x80)
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0)
        bytes.push((c & 0x3F) | 0x80)
      } else {
        bytes.push(c & 0xFF)
      }
    }
    return bytes
  },

  byteToString: function (arr) {
    if (typeof arr === 'string') {
      return arr
    }
    let str = ''
    const _arr = arr
    for (let i = 0; i < _arr.length; i++) {
      const one = _arr[i].toString(2)
      const v = one.match(/^1+?(?=0)/)
      if (v && one.length === 8) {
        const bytesLength = v[0].length
        let store = _arr[i].toString(2).slice(7 - bytesLength)
        for (let st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2)
        }
        str += String.fromCharCode(parseInt(store, 2))
        i += bytesLength - 1
      } else {
        str += String.fromCharCode(_arr[i])
      }
    }
    return str
  }
}
