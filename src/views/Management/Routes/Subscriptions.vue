<template>
  <section v-if="subscriptions" class="subscriptions">
    <h3>Total de Inscrições: {{ subscriptions.length }}</h3>
    <textarea
      name="all-subscriptions"
      id="all-subscriptions"
      :value="allSubscriptions"
    ></textarea>
    <button @click="copy" class="btn">Copiar</button>
  </section>
  <Loading v-else />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Subscriptions',
  computed: {
    allSubscriptions() {
      return this.subscriptions.map(sb => sb._id).join(' ');
    },
    ...mapState(['subscriptions']),
  },
  methods: {
    copy() {
      const copyText = document.getElementById('all-subscriptions');

      copyText.select();
      copyText.setSelectionRange(0, 9999999);

      navigator.clipboard.writeText(copyText.value);
    },
    ...mapActions(['managementGet', 'managementUpdate']),
  },
  async created() {
    if (!this.subscriptions) await this.managementGet({ route: 'SUBSCRIPTIONS' });
  },
};
</script>

<style scoped>
.subscriptions h3 {
  margin-bottom: 15px;
}

.subscriptions .btn {
  margin-top: 10px;
}

#all-subscriptions {
  width: 100%;
  background-color: #ffffffd4;
  border: 1px solid var(--text-secondary);
}
</style>
