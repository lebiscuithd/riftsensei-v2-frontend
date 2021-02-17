<template>
  <div class="composer">
    <textarea v-model="message" @keydown.enter="send" placeholder="Message..." style="color: #f2f2f2"></textarea>
  </div>
</template>

<script>
export default {
  name: 'MessageComposer',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    send (e) {
      e.preventDefault()
      if (this.message === '') {
      }
      this.$emit('send', this.message)
      this.message = ''
    }
  }
}
</script>

<style scoped>

</style>
