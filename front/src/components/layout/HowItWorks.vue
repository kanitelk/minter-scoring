<template>
  <div class="block how-it-works">
    <div class="block__header">
      <h2>Как это работает</h2>
    </div>
    <div class="desc" style="margin-top: -10px">
      <p>Minter Scoring - проект репутации в сети Минтер. Вы можете проверить надежность любого адреса и узнать его вклад в сообщество.</p>
      <p>Любой желающий может использовать наше API для интеграции в свои проекты. </p>
      <p>Чтобы оставить запись в репутации адреса: </p>
        <li>Жалоба. Отправить транзакцию на адрес с примечанием: scam: ... </li>
        <li>Благодарность. Отправить транзакцию на адрес с примечанием: respect: ... </li> 
        <li>Верификация. Отправить транзакцию на адрес с примечанием: verification: ... </li>
      <p>В примечании к транзакции должны быть комментарий и ваши контакты </p>
    </div>
  </div>  
</template>

<script>
export default {
  name: "HowItWorks"
}
</script>

<style>
  .how-it-works {
    grid-column: 2 / 8;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }

  @media screen and (max-width: 1000px) {
    .how-it-works {
      grid-column: 2 / 10;
    }
  }
</style>
