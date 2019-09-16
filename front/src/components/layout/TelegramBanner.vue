<template>
  <div class="telegram-banner">
    <div class="tlg-image">
      <img src="../../../assets/tlg.png">
    </div>
    <div class="desc">
      <div class="block__header">
        <h2>Бот в Telegram</h2>
      </div>
      <a href="tg://resolve?domain=minter_scoring_bot" class="primary-button">Перейти</a>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'TelegramBanner'
}
</script>

<style lang="scss">
  @import '../../App';

  .telegram-banner {
    display: flex;
    flex-flow: column wrap;
    grid-column: 8 / 10;
    background-color: #fff;

    .desc {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      padding-bottom: 15px;

      a {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #fff !important;
        text-decoration: none;
        width: 90%;
      }
    }
  }
  .tlg-image {
    display: flex;
    justify-content: center;
    height: 300px;
    min-width: 100%;
    background-color: $primary-orange;

    img {
      align-self: flex-end;
    }
  }

  @media screen and (max-width: 1000px) {
    .telegram-banner {
      grid-column: 2 / 10;

      a {
        width: 200px;
      }
    }
  }
</style>
