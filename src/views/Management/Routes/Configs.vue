<template>
  <section class="configs" v-if="tempConfigs">
    <ul class="configs-wrapper">
      <li v-for="(value, key) in tempConfigs" :key="value._id">
        <h4>{{ value.config.title }}</h4>
        <div>
          <label class="switch">
            <input type="checkbox" v-model="tempConfigs[key].config.value" />
            <span class="slider"></span>
          </label>
          <small
            >{{ value.config.value ? 'Desativar' : 'Ativar' }} as
            {{ value.config.title.toLowerCase() }} no site</small
          >
        </div>
        <div>
          <label for="link">Link para as {{ value.config.title.toLowerCase() }}</label>
          <input
            type="text"
            name="link"
            id="link"
            v-model.lazy="tempConfigs[key].config.link"
          />
        </div>
      </li>
    </ul>
  </section>
  <Loading v-else />
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Configs',
  data() {
    return {
      tempConfigs: null,
    };
  },
  computed: {
    ...mapState(['configs']),
  },
  methods: {
    ...mapActions(['managementGet', 'managementUpdate']),
  },
  watch: {
    configs: {
      handler(val) {
        if (val && JSON.parse(JSON.stringify(val)) != this.tempConfigs)
          this.tempConfigs = JSON.parse(JSON.stringify(val));
      },
      deep: true,
    },
    tempConfigs: {
      handler(value) {
        if (value && JSON.stringify(value) != JSON.stringify(this.configs))
          this.managementUpdate({ payload: value, route: 'CONFIGS' });
      },
      deep: true,
    },
  },
  created() {
    this.managementGet({ route: 'CONFIGS' });
  },
};
</script>

<style scoped>
.configs-wrapper li {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 2px solid var(--background-fading);
  padding: 10px;
  padding-bottom: 15px;
}

.configs-wrapper small {
  margin-left: 10px;
  color: var(--text-primary);
}

.configs-wrapper > li > div:last-child {
  display: flex;
  flex-direction: column;
  margin-top: 14px;
}
</style>
