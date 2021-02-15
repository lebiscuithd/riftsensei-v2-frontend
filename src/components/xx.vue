<template>
  <v-row justify="center">
    <v-col cols="5">
      <div class="text-h4 mb-5">
        Please give us your payment details:
      </div>
      <card class="stripe-card"
      stripe="pk_test_51IIW3wLera9KqYYc3uYRkdYdjFSMCFB5vzZxLU2Dbr1o2ekWUkYAWkUefStKDnA6nDGfk1JiN29fGoJyq8D5AIS100lbJg4BtA"
      :options="stripeOptions"
      @change="errorHandler($event)"/>
      <div id="card-errors" role="alert" v-text="errorMessage"></div>
      <v-btn block color="indigo" dark class="mt-5" @click="pay">Make payment</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
export default {
  components: { Card },
  data () {
    return {
      complete: false,
      errorMessage: '',
      stripeOptions: {}
    }
  },
  methods: {
    errorHandler: function (event) {
      this.errorMessage = event.error ? event.error.message : ''
    },
    pay: function () {
      createToken().then(data => console.log(data.token))
    }
  }
}
</script>

<style>
#card-errors {
  color: #fa755a;
}
.StripeElement {
  box-sizing: border-box;
  height: 45px;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}
.StripeElement--invalid {
  border-color: #fa755a;
}
.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
