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
        <a :href="`${mscan}${tx.from}`" target="_blank" v-if="tx.profile">{{tx.profile}}</a>
        <a :href="`${mscan}${tx.from}`" target="_blank" v-else>{{tx.from.substr(0,6) + '...' + tx.from.slice(-4)}}</a>
        <span v-if="tx.score" style="margin-left: 5px;">({{tx.score}})</span>
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
  public mscan = 'https://minterscan.net/address/';

  decode (payload: string) {
    return Buffer.from(payload, 'base64').toString('utf8')
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
  align-items: center;
  margin-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.3rem;
  background-color: #f5f5f5;

  .from {
    a {
      color: #de4a20;
      text-decoration: none;

      &:hover {
        color:#b63b19;
      }
    }
  }
}
</style>