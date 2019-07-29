<template>
  <div class="block result-block2">
    <h2>Карма и монеты</h2>

    <span style="margin-top: -10px">KARMA (Баланс): <strong>{{Math.round(info.balanceKarma * 100000) / 100000}} ☘️</strong></span>
    <span>KARMA (Делегировано): <strong>{{Math.round(info.delegatedKarma * 100000) / 100000}} ☘️</strong></span>
    <span style="margin-bottom: 10px">KARMA (Получено): <strong>{{Math.round(info.receivedKarma * 100000) / 100000}} ☘️</strong></span>
    <span style="margin-top: 10px;">Созданные монеты: 
      <span v-if="info.coins.length === 0">Нет</span>
      <span v-if="info.coins.length > 0">{{info.coins.map((item) => item.symbol).join(', ')}}</span>
    </span>
    <span v-if="info.coins.length > 0">Ликвидировано монет: {{info.coins.length - info.existCoins}}<strong></strong></span>

    <span style="margin-top: 10px">Благодарности: <strong v-bind:class="{'green': info.respectTx.length > 0}">{{info.respectTx.length}} 👍</strong></span>
    <span>Жалобы: <strong v-bind:class="{'red': info.scamTx.length > 0}">{{info.scamTx.length}} 👎</strong></span>
    <span>Верификации:<strong v-bind:class="{'green': info.verificationTx.length > 0}"> {{info.verificationTx.length}} 👍</strong> </span>
  </div>
</template>

<script>
export default {
  name: 'Result2',
  props: ['info', 'explorerURL'],
  computed: {
    rankString: function() {
      if (this.info.score < 10) return 'Очень низкий'
      if (this.info.score >= 10 && this.info.score < 27) return 'Низкий'
      if (this.info.score >= 27 && this.info.score < 35) return 'Ниже среднего'
      if (this.info.score >= 35 && this.info.score < 45) return 'Средний'
      if (this.info.score >= 45 && this.info.score < 65) return 'Выше среднего'
      if (this.info.score >= 65 && this.info.score < 100) return 'Высокий'
      if (this.info.score === 100) return 'Очень высокий'
    },
    age: function () {
      let b = new Date(this.info.age);
      console.log(b);
      
      console.log(new Date() - b);
      return Math.floor(+((new Date() - b)/86400000));
    },
    level: function() {
      return ('' + this.info.totalDelegatedBip)[0];
    }
  },
}
</script>

<style lang="scss" scope>
  .result-block2 {
    grid-column: 6 / 10;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }

  .red {
    color: red;
    background: unset;
  }

  .orange {
    color: orange;
  }

  .green {
    color: green;
  }

  @media screen and (max-width: 1000px) {
    .result-block2 {
      grid-column: 2 / 10;
      display: flex;
      flex-flow: column wrap;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: left;
    }
  }
</style>
