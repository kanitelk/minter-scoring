<template>
  <v-hover>
    <v-card class="status-card" slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`">
      <v-flex xs12>
        <v-layout column wrap align-start ma-1>
          <span class="headline">Верификации</span>
        </v-layout>
        <v-data-table
          :headers="headers"
          :items="verificationTx"
          class="elevation-1"
          no-data-text="Верификаций не найдено"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ decode(props.item.payload) }}</td>
            <td class="text-xs-left"><a :href="`${explorerURL}/tx/${props.item.hash}`" target="_blank">{{ props.item.from.substr(0,12) + '...' + props.item.from.slice(-8)}}</a></td>
          </template>
        </v-data-table>
      </v-flex>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: 'Verifications',
    props: ['verificationTx', 'explorerURL'],
    data () {
      return {
        headers: [
          { text: 'Сообщение', value: 'from', sortable: false },
          { text: 'Отправитель', value: 'payload', sortable: false },
        ],
      }
    },
    methods: {
      decode: function(string) {
        return Buffer.from(string, 'base64').toString('utf8')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .history-table {
    margin-top: 15px;
  }
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

