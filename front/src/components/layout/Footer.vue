<template>
  <div class="footer">
    <div class="logo">
        <h1>Minter Scoring</h1>
      </div>
      <div class="menu">
        <p class="respect-modal-link" v-on:click="toggleModal">Благодарности</p>
      </div>
      <sweet-modal ref="modal">
        <div class="modal">
          <p>Выражаем огромную благодарность за помощь в становлении сервиса:</p>

          <strong>Evgeny ⚪️ POPE Gordeev</strong>
          <span>Материальная поддержка и пиар</span>
          <br>

          <strong>Dmitriy Ustimenko</strong>
          <span>Редизайн веб-версии</span>
          <br>

          <strong>SMART(X) Minter</strong>
          <span>Материальная поддержка</span>
          <br>

          <strong>MinterScan 🍃</strong>
          <span>API профилей</span>
          <br>

          <strong>Scryaga</strong>
          <span>Ранняя поддержка</span>
          <br>

          <strong>Minter One</strong>
          <span>Открытое API ноды + кэшбэк для проектов</span>
          <br>

          <h4>С нами работают:</h4>
          <a href="https://tele.click/PCOAlert" target="_blank">PCO Alert</a>
          <a href="https://tele.click/coinfeed" target="_blank">CoinFeed</a>
          <a href="https://tele.click/MinterToolsBot" target="_blank">Minter Tools</a>
        </div>
      </sweet-modal>  
  </div>
</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
  name: 'Footer',
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

<style lang="scss" scope>
  @import '../../App';

  .modal {
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    text-justify: left;
  }

  .footer {
    background: $primary-orange;
    display: grid;
    grid-template-columns: 10% repeat(8, 1fr) 10%;
    grid-column-gap: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute; 
    bottom: 0;
    width: 100%;

    .logo {
      grid-column: 2 / 6;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-left: 20px;
      h1 {
        font-size: 1em;
        color: #fff !important;
        cursor: pointer;

        &:hover {
          color: rgb(255, 240, 232) !important;
        }
      }
  }

  .respect-modal-link {
    color: #fff;
    cursor: pointer;

    &:hover {
      color: rgb(230, 230, 230);
    }
  }

  .menu {
    grid-column: 6 / 10;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    padding-right: 20px;
  }
}

@media screen and (max-width: 1000px) {
  .footer {
    grid-template-columns: 0fr repeat(8, 1fr) 0fr;

    .logo {
      grid-column: 2 / 6;
    };
  }
}

@media screen and (min-width: 1400px) {
  .footer {
    grid-template-columns: 20% repeat(8, 1fr) 20%;
  }
}
</style>
