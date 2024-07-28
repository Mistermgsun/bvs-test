<script></script>

<template>
  <div class="outer-container">
    <div class="test-container">
      <div class="test-container__table">
        <div class="test-container__content">
          <ul>
            <li>Ciao</li>
            <li>Ciao</li>
            <li>Ciao</li>
            <li>Ciao</li>
            <li>Ciao</li>
            <li>Ciao</li>
            <li>Ciao</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.outer-container {
  width: 100%;
  height: 300px;
  overflow: hidden; /* Nasconde le barre di scorrimento */
  position: relative;
  background-color: gray;
}

.test-container {
  width: 100%;
  height: 100%;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: gray;
    height: 100%;
    width: var(--table-padding);
    top: 0;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }

  &__table {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: var(--table-padding);
    overflow-x: scroll;
    -ms-overflow-style: none; /* Nasconde la barra di scorrimento in IE e Edge */
    scrollbar-width: none; /* Nasconde la barra di scorrimento in Firefox */
  }

  &__table::-webkit-scrollbar {
    display: none; /* Nasconde la barra di scorrimento in Safari e Chrome */
  }

  &__content {
    box-sizing: border-box;
    padding: 1rem;
    min-width: var(--table-min-width); /* Mantiene la larghezza minima */
    height: 100%;
    background-color: red;
  }

  ul {
    display: flex;
    list-style: none;
    gap: 2rem;
  }
}
</style>
