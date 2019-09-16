<template>
  <div id="app">
    <Header />
    <div class="app-container">
      <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="true"
        color="#FC4F1E"
        loader="dots"
        :opacity="0.8"
        background-color="#E5E5E5">
        <h3 slot="after">Загружаем данные ☘️</h3>
      </loading>
      <AddressForm v-on:submit="check($event)" />
      <HowItWorks v-if="!showResult" />
      <TelegramBanner v-if="!showResult" />
      <MscanProfile v-if="showResult && info.profile !== false" :profile="info.profile" :explorerURL="expURL" />
      <Result v-if="showResult" :info="info" :explorerURL="expURL" />
      <Result2 v-if="showResult" :info="info" :explorerURL="expURL" />
      <Scams v-if="showResult" :scamTx="info.scamTx" :explorerURL="expURL" />
      <Respects v-if="showResult" :respectTx="info.respectTx" :explorerURL="expURL" />
      <Verifications v-if="showResult" :verificationTx="info.verificationTx" :explorerURL="expURL" />
      <HowItWorks v-if="showResult" />
      <TelegramBanner v-if="showResult" />
    </div>
    <Footer />
  </div>
</template>

<script>
import AddressForm from './components/AddressForm';
import Result from './components/Result';
import Result2 from './components/Result2';
import Respects from './components/Respects';
import Scams from './components/Scams';
import Verifications from './components/Verifications';
import TelegramBanner from './components/layout/TelegramBanner';
import MscanProfile from './components/MscanProfile';

import HowItWorks from './components/layout/HowItWorks';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';

import { HTTP } from '../http';

export default {
  name: 'App',
  components: { AddressForm, Result, Result2, Respects, Scams, Verifications, HowItWorks, Header, TelegramBanner, MscanProfile, Loading, Footer },
  data() {
    return {
      isLoading: false,
      showResult: false,
      info: {},
      expURL: 'https://minterscan.net'
    }
  },
  methods: {
    check: function(address) {
      this.isLoading = true;
      this.showResult = false;
      HTTP.get(address).then((res) => {
        //console.log(res.data);
        this.info = res.data;
        this.isLoading = false;
        this.showResult = true
      }).catch(err => {
        this.isLoading = false;
        alert('При выполнении запроса произошла ошибка');
      })
    }
  },
}
</script>

<style lang="scss">
  @import 'app.scss'
</style>
