<template>
  <div class="feed" ref="feed">
    <ul v-if="contact">
      <li v-for="message in messages" :class="`message${message.to === contact.id ? ' sent' : ' received'}`" :key="message.id">
        <div class="text">
          {{ message.text }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MessagesFeed',
  props: {
    contact: {
      type: Object
    }
  },
  computed: mapState({
    messages: state => state.messages.messages
  }),
  methods: {
    scrollToBottom () {
      setTimeout(() => {
        this.$refs.feed.scrollTop = this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight
      }, 500)
    }
  },
  watch: {
    contact (contact) {
      this.scrollToBottom()
    },
    messages (messages) {
      this.scrollToBottom()
    }
  }
}
</script>

<style scoped>

</style>
