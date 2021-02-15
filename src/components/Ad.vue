<template>
  <div class="mb-7">
    Name : {{ad.coach.username}} <br>
    Verified : {{ad.coach.verified_coach}} <br>
    Rank : {{ad.coach.rank.name}}<img :src="ad.coach.rank.image" alt="" width="50"> <br>
    Description : {{ad.ad.description}} <br>
    Date : {{ad.ad.coaching_date}} <br>
    Duration : {{ad.ad.duration}} <br>
    Rate : {{ad.ad.hourly_rate}} <br>
    Price : {{ad.ad.total_price}} <br>

<v-btn>Book it</v-btn>
<v-divider></v-divider>

  </div>
</template>

<script>
export default {
  props: ['ad']
}
</script>

<style>

</style>
