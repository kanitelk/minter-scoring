<template>
  <v-hover>
    <v-card class="status-card" slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`">
      <v-flex xs12>
        <v-layout column wrap align-start>
          <span class="headline">Как это работает?</span>
        </v-layout>
        <v-layout column wrap align-start justify-start align-content-start pt-2>
          <span>Minter Scoring - некоммерческий проект глобальной <strong>репутации</strong>.</span>
          <span>Вы можете проверить надежность любого адреса и узнать его вклад в сообщество.</span>
          <p>
            <span>Любой желающий может использовать наше API для интеграции в свои проекты.</span>
          </p>

        </v-layout>
        <v-layout column wrap align-start justify-start align-content-start  pt-2>
          <strong>Чтобы оставить запись в репутации чужого(!) адреса:</strong>
            <span style="margin-top: 8px; margin-bottom: 8px;">Отправить любую транзакцию на адрес</span>
            <span><strong>Жалоба.</strong> Отправить транзакцию с примечанием: <i>scam: ...</i></span>
            <span><strong>Респект.</strong> Отправить транзакцию с примечанием: <i>respect: ...</i></span>
            <span><strong>Верификация.</strong> Отправить транзакцию с примечанием: <i>verification: ...</i></span>
            <span style="margin-top: 8px">В примечании к транзакции должны быть комментарий и ваши контакты</span>
            <v-divider></v-divider>
            <span style="margin-top: 10px; word-break: break-all">
              Вы можете материально поддержать наш проект:
            </span>  
            <code style="margin-top: 10px; word-break: break-all">Mxcf3b7531dd5ee878c5cc30ab198d30b427555555</code>
        </v-layout>
      </v-flex>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "HowItWorks"
}
</script>

<style>
  .status-card {
    padding: 15px;
    text-align: left !important;
  }
</style>
