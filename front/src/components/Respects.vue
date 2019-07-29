<template>
  <div class="block respects-block">
    <h2>Благодарности</h2>
    <div class="respects">
      <div v-for="(item, index) of respectTx" class="respect">
        <div class="payload">
          <p>{{decode(item.payload)}}</p>
        </div>
        <div class="from">
          <a :href="`${explorerURL}/tx/${item.hash}`" target="_blank">{{ item.from.substr(0,6) + '...' + item.from.slice(-4)}}</a>
        </div>
      </div>
    </div>
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

  .respects-block {
    grid-column: 2 / 10;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: flex-start;

    .respects {
      display: flex;
      flex-flow: column wrap;
      align-items: flex-start;
      text-align: left;
      width: 100%;

      .respect {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: $primary-gray;
        margin-bottom: 10px;

        .from {
          display: flex;
          justify-content: center;
          margin-left: 10px;
          padding-top: 5px;
          padding-bottom: 5px;
          padding-right: 20px;
        }

        .payload {
          padding-left: 20px;
          word-break: break-all;
        }
      }

      a {
        text-decoration: none;

        &:hover {
          color: darken($primary-orange, 20%);
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .respect {
      flex-flow: row wrap;
    }
  }
</style>

