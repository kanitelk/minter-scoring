<template>
  <v-app id="app">
    <v-toolbar 
      class="header-toolbar"
    >
    <v-toolbar-title>Minter Scoring</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat href="https://minter.work" target="_blank">Сайт</v-btn>
      <v-btn flat href="https://tele.click/minterw" target="_blank">Telegram</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <div class="app-container">
    <AddressForm v-on:submit="check($event)" />
    <HowItWorks v-if="!showResult" />
    <Result v-if="showResult" :info="info" :explorerURL="expURL" />
    <Scams v-if="showResult" :scamTx="info.scamTx" :explorerURL="expURL" />
    <Respects v-if="showResult" :respectTx="info.respectTx" :explorerURL="expURL" />
    <Verifications v-if="showResult" :verificationTx="info.verificationTx" :explorerURL="expURL" />
    <HowItWorks v-if="showResult" />
    <div v-if="isLoading" class="text-xs-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
  </v-app>
</template>

<script>
import AddressForm from './components/AddressForm';
import Result from './components/Result';
import Respects from './components/Respects';
import Scams from './components/Scams';
import Verifications from './components/Verifications';
import HowItWorks from './components/HowItWorks'

import { HTTP } from '../http';

export default {
  name: 'App',
  components: { AddressForm, Result, Respects, Scams, Verifications, HowItWorks },
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
        console.log(res.data);
        this.info = res.data;
        this.isLoading = false;
        this.showResult = true
      })
    }
  },
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #fff !important;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.header-toolbar {
  background: #b4583f !important;

  a {
    color: #fff !important;
  }
}

.v-toolbar__title {
  color:#fff !important;

  &:hover {
    cursor: pointer;
  }
}

a {
    color: #b4583f !important;
}

.app-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 15px;
  margin: 20px;
}

@media screen and (max-width: 1000px) {
  .app-container {
    display: grid;
    grid-template-columns: 1fr ;
    grid-row-gap: 15px;
  }
}
</style>
