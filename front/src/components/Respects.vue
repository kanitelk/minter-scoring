<template>
  <div v-if="respectTx.length > 0" class="block table-block">
    <h2>Благодарности</h2>
    <div class="txs">
      <div v-for="item of respectTx" :key="item.txn" class="tx">
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
    <h2>Благодарностей нет</h2>
    <span>Надеемся, что будут!</span>
  </div>
</template>

<script>
  export default {
    name: 'respects',
    props: ['respectTx', 'explorerURL'],
    methods: {
      decode: function(string) {
        return Buffer.from(string, 'base64').toString('utf8')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../App';
</style>

