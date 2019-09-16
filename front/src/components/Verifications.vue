<template>
  <div v-if="verificationTx.length > 0" class="block table-block">
    <h2>Верификации</h2>
    <div class="txs">
      <div v-for="item of verificationTx" :key="item.txn" class="tx">
        <div class="payload">
          <p>{{decode(item.payload)}}</p>
        </div>
        <div class="from">
          <a :href="`${explorerURL}/tx/${item.hash}`" target="_blank">{{ item.from.substr(0,6) + '...' + item.from.slice(-4)}}</a>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="block table-block-null">
    <h2>Верификаций нет</h2>
  </div>
</template>

<script>
  export default {
    name: 'Verifications',
    props: ['verificationTx', 'explorerURL'],
    methods: {
      decode: function(string) {
        return Buffer.from(string, 'base64').toString('utf8')
      }
    }
  }
</script>

<style lang="scss">
  @import '../App';
</style>

