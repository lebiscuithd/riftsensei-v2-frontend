<template>
  <div class="contacts-list">
    <ul>
      <li v-for="(contact, index) in contacts" :key="contact.id"
          @click="selectContact(index, contact)"
          :class="{ 'selected': index === selected }">
        <div class="contact">
          <p class="name">{{ contact.username }}</p>
          <p class="email">{{ contact.email }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ContactsList',
  data () {
    return {
      selected: 0
    }
  },
  methods: {
    selectContact (index, contact) {
      this.selected = index
      this.$emit('selected', contact)
    }
  },
  computed: mapState({
    contacts: state => state.messages.contacts
  })
}
</script>

<style scoped>

</style>
