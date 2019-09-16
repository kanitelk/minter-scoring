<template>
  <div v-if="scamTx.length > 0" class="block table-block">
    <h2>Жалобы</h2>
    <div class="txs">
      <div v-for="item of scamTx" :key="item.txn" class="tx">
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
    <h2>Жалоб нет</h2>
  </div>
</template>

<script>
  export default {
    name: 'scams',
    props: ['scamTx', 'explorerURL'],
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

