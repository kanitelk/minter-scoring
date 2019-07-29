<template>
  <div class="block scams">
    <td class="text-xs-left">{{ decode(props.item.payload) }}</td>
    <td class="text-xs-left"><a :href="`${explorerURL}/tx/${props.item.hash}`" target="_blank">{{ props.item.from.substr(0,12) + '...' + props.item.from.slice(-8)}}</a></td>
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

<style lang="scss" scoped>
  .status-card {
    width: 100%;
    padding: 15px;
 
  }
  .status_true {
    color: rgb(13, 182, 13);
  }
  .status_false {
    color: rgb(241, 0, 0);
  }
  .text-xs-left {
    text-overflow: ellipsis !important;
  }
</style>

