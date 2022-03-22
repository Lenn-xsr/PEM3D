<template>
  <header>
    <nav>
      <router-link class="logo" to="/">
        <img src="@/assets/icon.svg" alt="Produção e Mercado 3D" />
      </router-link>
      <div v-if="config && config.value">
        <a class="btn" href="#subscribe">Quero fazer parte!</a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    config() {
      const configs = this.$store.state.configs;
      if (configs && configs[0])
        return configs.find((c) => c._id == "assignature").config;
      else return {};
    },
  },
};
</script>

<style scoped>
header {
  position: fixed;
  z-index: 9999;
  width: 100%;
  background-color: #060a3c52;
  left: 0;
  top: 0;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 28px;
}

nav div {
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

nav > div a {
  margin: 0 8px;
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 45px;
}

.user {
  color: var(--text-lighted) !important;
}

.btn {
  padding: 12px 29px;
  border-radius: 4px;
}

@media (max-width: 480px) {
  nav {
    padding: 0px 14px;
    min-height: 70px;
  }

  .logo img {
    display: none;
  }
}
</style>