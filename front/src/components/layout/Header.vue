<template>
  <div class="header">
    <div class="logo">
      <h1>Minter Scoring</h1>
    </div>
    <div class="menu">
      <a v-on:click="toggleModal" style="cursor: pointer">Вход</a>
      <a class="tlg-link" href="https://tele.click/minterw" target="_blank">Telegram</a>
    </div>
      <sweet-modal ref="modal">
        <div class="modal">
          <strong>Функционал в разработке</strong>
          <br>
          <span>Скоро будет представлена платная подписка.
          Платная подписка дает доступ к дополнительным инструментам и сервисам.</span>
          <br>
          <span>API и базовый функционал будут бесплатными.</span>
          <strong>Оплата монетой SCORING</strong>
          <br>
          <span>Следите за анонсами!</span>
        </div>
      </sweet-modal> 
  </div>
</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
  name: 'Header',
  components: {
    SweetModal,
    SweetModalTab
  },
  methods: {
    toggleModal: function () {
      this.$refs.modal.open();
    }
  }
}
</script>

<style lang="scss">

@import '../../App';

.header {
  background: $primary-orange;
  display: grid;
  grid-template-columns: 10% repeat(8, 1fr) 10%;
  grid-column-gap: 20px;
  padding-left: 20px;
  align-items: center;

  height: 60px;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      color: rgb(206, 206, 206);
    }
  }

  .logo {
    grid-column: 2 / 6;
    display: flex;
    h1 {
      font-size: 1.3em;
      color: #fff !important;
      cursor: pointer;

      &:hover {
        color: rgb(255, 240, 232) !important;
      }
    }
  }

  .menu {
    grid-column:  6 / 10;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-self: center;

    a {
      margin-right: 20px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .header {
    grid-template-columns: 0fr repeat(8, 1fr) 0fr;
  }

  .tlg-link {
    display: none;
  }
}

@media screen and (min-width: 1400px) {
  .header {
    grid-template-columns: 20% repeat(8, 1fr) 20%;
  }
}
</style>
