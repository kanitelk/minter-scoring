<template>
  <div class="header">
      <div class="logo">
        <h1>Minter Scoring</h1>
      </div>
      <div class="menu">
        
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header'
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

  .logo {
    grid-column: 2 / 6;
    display: flex;
    flex-flow: row nowrap;
    h1 {
      font-size: 1.3em;
      color: #fff !important;
      cursor: pointer;

      &:hover {
        color: rgb(255, 240, 232) !important;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .header {
    grid-template-columns: 0fr repeat(8, 1fr) 0fr;

    .logo {
      grid-column: 2 / 8;
    };
  }
}
</style>
