<template>
  <div class="block result-block">
    <h2>Результат: {{info.score}}/100</h2>
    <h4 style="margin-top: -15px;">Уровень доверия: <span v-bind:class="{'red':info.score < 30, 'orange': info.score >=30 && info.score < 65 ,'green': info.score > 65}">{{rankString}}</span></h4>
    <span>{{info.icon}} {{info.iconName}} {{level}}-го уровня</span>
    <span>Возраст: <strong>{{age}} дней 📅</strong></span>
    <span>Genesis: 
      <strong v-if="info.genesis">Да ✔</strong>
      <strong v-if="!info.genesis">Нет</strong>
    </span>
    <span style="margin-top: 10px">Делегировано: <strong>{{info.totalDelegatedBip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}}</strong> BIP</span>
    <span>Транзакции: <strong>{{info.transactions}}</strong></span>
    <br />
    <span v-if="info.smart_expert > 0">SMART(X) Expert: {{Math.round(info.smart_expert * 100) / 100}} ✅</span>
    <span v-if="info.smart_rating > 0">SMART(X) Project: {{Math.round(info.smart_rating * 100) / 100}} ✅</span>
  </div>
</template>

<script>
export default {
  name: 'Result',
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
  .result-block {
    grid-column: 2 / 6;
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
    .result-block {
      grid-column: 2 / 10;
      display: flex;
      flex-flow: column wrap;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: left;
    }
  }
</style>
