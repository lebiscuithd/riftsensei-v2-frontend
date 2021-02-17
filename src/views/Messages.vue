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
    }
  }
}
</script>

<style scoped>

</style>
