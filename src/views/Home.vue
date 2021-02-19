<template>
<div>
    <div class="container row mx-auto mb-3 pl-5" id="introwithimage">

        <div class="container col-12 col-md-6 py-5 bg-transparent mx-0 text-left wow animate__animated animate__fadeInLeft mt-10">
            <h1 class="display-4">Welcome to </h1>
            <h1 class="display-4 mb-3"><b>RiftSensei !</b></h1>
            <h3 class="mb-4">Start your training and become a legend !</h3>
            <p class="lead">
              <v-btn text dark  outlined to="/ads" class="mr-2" role="button">Find your sensei</v-btn>
              <v-btn outlined to="/createAd" class="primary" role="button">Become a sensei</v-btn>
        </p>

        </div>
              <div class="col-4 col-md-5 mr-3">
                <img class= "wow animate__animated animate__backInRight" src="../assets/proto persolol.png" height="400px">
              </div>
    </div>
            <!--- Features --->
    <div class="container-fluid bg-light py-5" id="Features">
            <div class="container my-md-5 px-5">
                <div class="row">
                    <div class="container col-lg-6 text-left wow animate__animated animate__fadeInLeft row">
                        <h2 class="mb-5"> <img src="../assets/japansensei.png" alt=""> What is RiftSensei ?</h2>
                        <h3>RiftSensei is a coaching plateform for League of Legends players. <br><br> Everyone can be a sensei (a coach), a student or both ! <br> Create your profile with your in-game stats that can be checked by other users. <br><br> Senseis post coaching ads with some informations and students can book it. </h3>
                    </div>
                    <div class="container col-md-6 wow animate__animated animate__fadeInRight text-right my-auto">
                        <img src="../assets/lol.png" class="rounded-pill" width="400px" alt="">
                    </div>
                </div>
            </div>
    </div>
        <!--- Features --->
    <div class="container-fluid bg-none py-5" id="Features">
            <div class="container my-md-5 px-5">
                <div class="row">
                    <div class="container col-lg-6 wow animate__animated animate__fadeInLeft text-left">
                        <img src="../assets/circle.png" height="100%" alt="">
                    </div>
                    <div class="container col-md-6 text-left wow animate__animated animate__fadeInRight row">
                        <h2 class="mt-15 mb-4"> ⚡️ RiftSensei is a virtuous circle ecosystem.</h2>
                        <h3>Everyone can be a sensei or a student. You earn gems when you coach that you can spend to receive coaching from a more experienced player than you. <br><br>That's why using RiftSensei is totally free !</h3>
                    </div>
                </div>
            </div>
    </div>
    <!--- Features --->
    <div class="container-fluid bg-light py-5" id="Features">
            <div class="container my-sm-5">
                <div class="row">
                    <div class="container col-md-6 text-left wow animate__animated animate__fadeInLeft row my-auto">
                        <h2 class="mb-4"> 💻 📱 RiftSensei is a responsive website.</h2>
                        <h3>You can use RiftSensei on all your devices !</h3>
                    </div>
                    <div class="container col-lg-6 wow animate__animated animate__fadeInRight text-right">
                        <img src="../assets/responsive.png" height="100%" alt="">
                    </div>
                </div>
            </div>
    </div>
    <!--- Features --->
    <div class="container-fluid bg-none py-5" id="Features">
            <div class="container my-md-5 px-5">
                <div class="row">
                    <div class="container col-lg-6 wow animate__animated animate__fadeInLeft text-left">
                        <img src="../assets/market.png" class="rounded" height="100%" alt="">
                    </div>
                    <div class="container col-md-6 text-left wow animate__animated animate__fadeInRight row my-auto">
                        <h2 class="mb-5"> <img src="../assets/gem.svg" height="25px" alt=""> Buy some gems in the Market.</h2>
                        <h3>If you don't want to be a sensei to earn gems, don't fret you can still buy some gems on the market for few euros.</h3>
                    </div>
                </div>
            </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
