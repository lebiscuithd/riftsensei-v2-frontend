<template>
  <div>
    <h1>Messages board</h1>
    <Conversation :contact="selectedContact" :messages="messages"/>
    <ContactsList :contacts="contacts" @selected="startConversationWith"/>
  </div>
</template>

<script>
import Conversation from '../components/Conversation'
import ContactsList from '../components/ContactsList'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Messages',
  components: {
    ContactsList,
    Conversation
  },
  data () {
    return {
      selectedContact: null,
      messages: []
    }
  },
  mounted () {
    console.log(this.authuser.id)

    const channel = this.$pusher.subscribe(`messages-${this.authuser.id}`)
    channel.bind('NewMessage', (e) => {
      console.log(e)
    })
    this.getContacts()
  },
  computed: {
    ...mapGetters({
      contacts: 'messages/contacts',
      authuser: 'auth/authuser'
    })
  },
  methods: {
    ...mapActions({
      getContacts: 'messages/getContacts',
      getMessages: 'messages/getMessages'
    }),
    startConversationWith (contact) {
      this.getMessages(contact)
      this.selectedContact = contact
    },
    handleIncoming (message) {
      if (this.selectedContact && message.from === this.selectedContact.id) {
        this.messages.push(message)
        return
      }
      alert(message.text)
    }
  }
}
</script>

<style scoped>

</style>
