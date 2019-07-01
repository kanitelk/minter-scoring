<template>
  <v-hover>
    <v-card class="result-card" slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`">
    <v-card-title>
      <div class="headline">Результат: <strong>{{info.score}}/100</strong></div>
    </v-card-title>
    <v-layout column wrap align-start justify-start align-content-start ma-3>
      <h4>Уровень доверия: <span v-bind:class="{'red1':info.score < 30, 'orange1': info.score >=30 && info.score < 65 ,'green1': info.score > 65}">{{rankString}}</span></h4>
      <span style="margin-top: 10px">
        {{info.icon}} 
        <a :href="`https://minterscan.net/address/${info.address}`" target="_blank">
          {{info.address.substr(0, 12) + '...' + info.address.slice(-8)}}
        </a>
      </span>
      <span>{{info.iconName}} {{level}}-го уровня</span>
      <span style="margin-top: 10px">KARMA (Баланс): <strong>{{Math.round(info.balanceKarma * 100000) / 100000}} ☘️</strong></span>
      <span>KARMA (Делегировано): <strong>{{Math.round(info.delegatedKarma * 100000) / 100000}} ☘️</strong></span>
      <span style="margin-bottom: 10px">KARMA (Получено): <strong>{{Math.round(info.receivedKarma * 100000) / 100000}} ☘️</strong></span>
      <span>Возраст: <strong>{{age}} дней 📅</strong></span>
      <span>Genesis: 
        <strong v-if="info.genesis">Да ✔</strong>
        <strong v-if="!info.genesis">Нет</strong>
      </span>
      <span style="margin-top: 10px">Делегировано: <strong>{{info.totalDelegatedBip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}}</strong> BIP</span>
      <span>Транзакции: <strong>{{info.transactions}}</strong></span>
      <span style="margin-top: 10px;">Созданные монеты: 
        <span v-if="info.coins.length === 0">Нет</span>
        <span v-if="info.coins.length > 0">{{info.coins.map((item) => item.symbol).join(', ')}}</span>
      </span>
      <span v-if="info.coins.length > 0">Ликвидировано монет: {{info.coins.length - info.existCoins}}<strong></strong></span>
  
      <span style="margin-top: 10px">Благодарности: <strong v-bind:class="{'green1': info.respectTx.length > 0}">{{info.respectTx.length}} 👍</strong></span>
      <span>Жалобы: <strong v-bind:class="{'red1': info.scamTx.length > 0}">{{info.scamTx.length}} 👎</strong></span>
      <span>Верификации: <strong v-bind:class="{'green1': info.verificationTx.length > 0}">{{info.verificationTx.length}} 🤝</strong></span>
    </v-layout>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'AddressForm',
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
  .result-card {
    text-align: left !important;
  }
  .v-card__title {
    padding-bottom: 0px !important;
  }

  .red1 {
    color: red;
    background: unset;
  }

  .orange1 {
    color: orange;
  }

  .green1 {
    color: green;
  }
</style>
