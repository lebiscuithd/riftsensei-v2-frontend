<template>
  <div>
    <h1>{{ contact ? contact.username : 'Select a Contact' }}</h1>
    <MessagesFeed :contact="contact" :messages="messages"/>
    <MessageComposer @send="sendMessage"/>
  </div>
</template>

<script>
import MessagesFeed from './MessagesFeed'
import MessageComposer from './MessageComposer'
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: 'Conversation',
  components: {
    MessageComposer,
    MessagesFeed
  },
  props: {
    contact: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      contacts: 'messages/contacts',
      authuser: 'auth/authuser'
    }),
    ...mapState({
      messages: state => state.messages.messages
    })
  },
  methods: {
    ...mapActions({
      sendMessages: 'messages/sendMessages'
    }),
    sendMessage (text) {
      if (!this.contact) {
      }
      this.sendMessages({text: text, contact_id: this.contact.id, authuser: this.authuser.id})
    }
  }
}
</script>

<style scoped>

</style>
