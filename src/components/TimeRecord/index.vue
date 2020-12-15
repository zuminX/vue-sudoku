<template>
  <div>{{ formatMinute }}:{{ formatSecond }}</div>
</template>

<script>
export default {
  name: 'TimeRecord',
  data() {
    return {
      second: 0,
      minute: 0,
      timeId: null
    }
  },
  computed: {
    /**
     * 格式化分
     * @returns {string} 格式化后的分
     */
    formatMinute() {
      const minute = this.minute
      // 当分为一位时，将其补齐为两位
      return minute <= 9 ? `0${minute}` : minute
    },
    /**
     * 格式化秒
     * @returns {string} 格式化后的秒
     */
    formatSecond() {
      const second = this.second
      // 当秒为一位时，将其补齐为两位
      return second <= 9 ? `0${second}` : second
    }
  },
  methods: {
    /**
     * 开始计时
     */
    start() {
      // 设置当前秒、分钟为0
      this.second = 0
      this.minute = 0
      // 每隔1s执行如下函数
      this.timeId = setInterval(() => {
        // 当前为59秒
        if (this.second === 59) {
          // 设置当前秒为0，分钟加一
          this.second = 0
          this.minute++
        } else {
          this.second++
        }
      }, 1000)
    },
    /**
     * 停止计时
     */
    stop() {
      clearInterval(this.timeId)
    }
  }
}
</script>
