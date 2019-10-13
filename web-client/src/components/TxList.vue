<template>
  <div class="card tx-list">
    <div class="name">
      <h2>{{name}}</h2>
    </div>
    <div class="tx" v-for="(tx, index) in txs" :key="index">
      <div class="payload">
        <p>{{decode(tx.payload)}}</p>
      </div>
      <div class="from">
        <p>{{tx.from.substr(0,6) + '...' + tx.from.slice(-4)}}</p>
        <!-- <p>{{getName(tx.from)}}</p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import config from "../config";
import { getProfile } from '../common/http';

@Component
export default class TxList extends Vue {
  @Prop() name!: string;
  @Prop() txs!: Array<any>;

  decode (payload: string) {
    return Buffer.from(payload, 'base64').toString('utf8')
  }

  async getName(address: string) {
    let res = await getProfile(address);
    if (res) return res.title
    return address;
  }
}
</script>

<style lang="scss" scope>
.tx-list {
  display: flex;
  flex-flow: column wrap;

  .payload {
    word-break: break-all;
  }
}

.tx {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #f5f5f5;

  .from {
    color: #de4a20;
  }
}
</style>