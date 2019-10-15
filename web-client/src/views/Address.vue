<template>
  <div v-if="isLoading" class="address-view" style="margin-top: 3rem;">
    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
  </div>
  <div v-else class="address-view">
    <div class="address-row">
      <h3>{{address}}</h3>
      <div class="icons">
        <v-icon @click="copyAddress">mdi-content-copy</v-icon>
        <!-- <v-icon>mdi-qrcode-scan</v-icon> -->
      </div>
    </div>
    <Profile v-if="result.profile" :profile="result.profile" class="box" />
    <div class="row">
      <MainInfo :result="result" />
      <CoinsInfo :result="result" />
    </div>
    <TxList v-if="result.scamTx.length > 0" name="Жалобы" :txs="result.scamTx" class="box" />
    <TxList
      v-if="result.respectTx.length > 0"
      name="Благодарности"
      :txs="result.respectTx"
      class="box"
    />
    <TxList
      v-if="result.verificationTx.length > 0"
      name="Верификации"
      :txs="result.verificationTx"
      class="box"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import AddressForm from "../components/AddressForm.vue";
import Profile from "../components/Profile.vue";
import MainInfo from "../components/MainInfo.vue";
import CoinsInfo from "../components/CoinsInfo.vue";
import TxList from "../components/TxList.vue";
import { getScoring } from "../common/http";

import copy from 'copy-to-clipboard';

@Component({
  components: {
    Profile,
    MainInfo,
    CoinsInfo,
    TxList
  }
})
export default class Address extends Vue {
  @Prop() address!: string;
  public result: any = null;
  public isLoading = true;

  mounted() {
    this.getScoring();
  }

  async getScoring() {
    this.isLoading = true;
    this.result = await getScoring(this.address);
    this.isLoading = false;

    // console.log(this.result);
  }

  copyAddress() {
    copy(this.address);
    alert('Copied!');
  }
}
</script>

<style lang="scss" scoped>
.address-view {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  .address-row {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;
    margin-left: 1.5rem;

    h3 {
      padding-right: 5px;
      font-weight: 600;
      word-break: break-all;
    }

    .icons {
      padding-left: 7px;
    }

    i {
      &:hover {
        color: black;
      }

      &:not(:first-of-type) {
        padding-left: 7px;
      }
    }
  }
}

.box {
  width: calc(100% - 4rem);
}

.row {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
}

@media screen and (max-width: 1078px) {
  .row {
    width: calc(100% - 1rem);
    flex-flow: column wrap;
  }
}
</style>
