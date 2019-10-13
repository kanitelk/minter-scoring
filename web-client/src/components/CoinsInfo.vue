<template>
  <div class="card">
    <h2>Карма и монеты</h2>

    <div class="info">
      <p>KARMA (Баланс): <strong>{{Math.round(result.balanceKarma * 10000) / 10000}}</strong> ☘️</p>
      <p>KARMA (Делегировано): <strong>{{Math.round(result.delegatedKarma * 10000) / 10000}}</strong> ☘️</p>
      <p>KARMA (Получено): <strong>{{Math.round(result.receivedKarma * 10000) / 10000}}</strong> ☘️</p>

      <p style="margin-top: 2rem;">Созданные монеты: {{result.coins.length === 0 ? 'Нет' : createdCoins}}</p>
      <p v-if="result.coins.length > 0">Ликвидировано монет: {{result.coins.length - result.existCoins}}</p>

      <p style="margin-top: 2rem;">Благодарности: <strong v-bind:class="{'green': result.respectTx.length > 0}">{{result.respectTx.length}} 👍</strong></p>
      <p>Жалобы: <strong v-bind:class="{'red': result.scamTx.length > 0}">{{result.scamTx.length}} 👎</strong></p>
      <p>Верификации: <strong v-bind:class="{'green': result.verificationTx.length > 0}"> {{result.verificationTx.length}} 👍</strong></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import config from "../config";

@Component
export default class CoinsInfo extends Vue {
  @Prop() result: any;

  get resultRiskString() {
    if (this.result.score < 10) return "Очень низкий";
    if (this.result.score >= 10 && this.result.score < 27) return "Низкий";
    if (this.result.score >= 27 && this.result.score < 35)
      return "Ниже среднего";
    if (this.result.score >= 35 && this.result.score < 45) return "Средний";
    if (this.result.score >= 45 && this.result.score < 65)
      return "Выше среднего";
    if (this.result.score >= 65 && this.result.score < 100) return "Высокий";
    if (this.result.score === 100) return "Очень высокий";
  }

  get level() {
    return ('' + this.result.totalDelegatedBip)[0];
  }

  get age() {
    // @ts-ignore
    return Math.floor(+((new Date() - new Date(this.result.age))/86400000));
  }

  get createdCoins() {
    // @ts-ignore
    return this.result.coins.map(item => item.symbol).join(', ');
  }
}
</script>

<style lang="scss" scope>
.card {
  flex: 1;

  h3 {
    margin-top: -10px;
  }

  .red {
    color: red;
  }

  .orange {
    color: orange;
  }

  .green {
    color: green;
  }

  .info {
    p {
      line-height: 1;
    }
  }
}
</style>