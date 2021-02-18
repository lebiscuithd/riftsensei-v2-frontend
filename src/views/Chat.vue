<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" style="position: relative;">
        <div class="chat-container" ref="chatContainer" >
          <div>
                <div class="message" v-for="ad in ads.data" v-bind:key="ad.id" :class="{own: ad.ad.description !== 'toto'}">
                <div class="username">{{ad.coach.username}}</div>
                <div style="margin-top: 5px"></div>
                      <div class="content">
                            <div>{{ad.ad.description}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="typer">
          <input type="text" placeholder="Type here..." v-on:keyup.enter="alert('message envoyé')" v-model="content">
          <v-btn icon class="blue--text emoji-panel" @click="alert('click')">
            <v-icon>mdi-chat</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    this.getAds()
  },
  computed: {
    ...mapGetters({
      ads: 'ads/ads',
      authuser: 'auth/authuser'
    })
  },
  methods: {
    ...mapActions({
      getAds: 'ads/getAds'
    })
  }
}
</script>

<style>

  .typer{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    bottom: 0;
    height: 4.9rem;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
  }
  .typer input[type=text]{
    position: absolute;
    left: 2.5rem;
    padding: 1rem;
    width: 80%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1.25rem;
  }
  .chat-container{
    box-sizing: border-box;
    height: 40rem;
    overflow-y: auto;
    padding: 10px;
    background-color: #f2f2f2;
  }
  .message{
    margin-bottom: 3px;
  }
  .chat-container .username{
    font-size: 18px;
    font-weight: bold;
  }
  .message.own{
    text-align: right;
  }
  .message.own .content{
    background-color: lightskyblue;
  }
  .chat-container .content{
    padding: 8px;
    background-color: lightgreen;
    border-radius: 10px;
    display:inline-block;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
    max-width: 50%;
    word-wrap: break-word;
    }
  @media (max-width: 480px) {
    .chat-container .content{
      max-width: 60%;
    }
  }
</style>
