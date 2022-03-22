<template>
  <section v-if="modulos">
    <ModuleEdit :md="modulePre" />
    <button class="btn newModule" @click="newModule()">Criar Módulo</button>
    <draggable v-model="modulos" group="modulos" class="modules-wrapper lock-width">
      <div v-for="md in modulos" :key="md._id" class="md-wrapper">
        <div class="edits">
          <span class="mini-icon icon-grab"><i class="fas fa-hand-paper"></i></span>
          <span class="mini-icon icon-edit" @click="editModule(md)"
            ><i class="fas fa-pencil-alt"></i
          ></span>
          <span class="mini-icon icon-remove" @click="removeModule(md)"
            ><i class="fas fa-trash"></i
          ></span>
        </div>
        <Module :md="md" />
      </div>
    </draggable>
  </section>
  <Loading v-else />
</template>

<script>
import draggable from 'vuedraggable';
import { mapState, mapActions } from 'vuex';
import { api } from '@/services.js';

import Module from '@/components/Home/Module.vue';
import ModuleEdit from '@/components/Management/ModuleEdit.vue';

export default {
  name: 'Modules',
  components: { Module, draggable, ModuleEdit },
  data() {
    return {
      modulos: null,
      modulePre: {
        _id: null,
        show: false,
      },
    };
  },
  computed: {
    ...mapState(['modules']),
  },
  methods: {
    removeModule(md) {
      if (window.confirm(`Deseja deletar o módulo "${md.title}"?`)) {
        api
          .delete('/management/modules', {
            _id: md._id,
            image: md.image,
          })
          .then(response => {
            this.managementUpdate({ payload: response.data, route: 'MODULES' });
          });
      }
    },
    editModule(md) {
      this.modulePre = {
        md,
        preview: true,
      };
    },
    newModule() {
      this.modulePre = {
        md: null,
        preview: true,
        _id: Date.now(),
      };
    },
    ...mapActions(['managementGet', 'managementUpdate']),
  },
  watch: {
    modules: {
      handler(value) {
        if (JSON.stringify(this.modulos) !== JSON.stringify(value))
          this.modulos = JSON.parse(JSON.stringify(value));
      },
      deep: true,
    },
    modulos: {
      handler(value) {
        if (JSON.stringify(this.modules) !== JSON.stringify(value))
          this.managementUpdate({ payload: value, route: 'MODULES' });
      },
      deep: true,
    },
  },
  async created() {
    if (!this.modules) await this.managementGet({ route: 'MODULES' });
    this.modulos = JSON.parse(JSON.stringify(this.modules));
  },
};
</script>

<style scoped>
.modules {
  position: relative;
}

.btn.newModule {
  margin: 20px 12px;
}

.modules-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: auto;
  width: auto;
  gap: 0;
}

.md-wrapper {
  width: clamp(120px, 100%, 300px);
  min-height: 120px;
  position: relative;
  height: min-content;
  margin: 0 5px 10px;
  break-inside: avoid;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
}

.md-wrapper .module-wrapper {
  pointer-events: none;
  margin: 0;
  min-height: inherit;
}

.edits {
  position: absolute;
  right: 5px;
  top: 5px;
  display: grid;
  gap: 7px;
}

.icon-grab {
  cursor: grab;
}

.icon-edit:hover {
  background-color: var(--text-lighted);
}

.icon-remove:hover {
  background-color: #ff3434;
}

.modules-menu {
  display: flex;
  justify-content: space-between;
  border-bottom: 1.8px solid var(--lighted);
  padding: 5px 5px 10px;
  align-items: center;
  margin-bottom: 20px;
}

.modules-menu i {
  font-size: small;
}

.colapse-button {
  padding: 8px 15px;
  color: var(--text-primary);
  background-color: var(--lighted-secondary);
  border: 0;
  border-radius: 5px;
  font-size: 0.9rem;
}

@media screen and (max-width: 500px) {
  .module-wrapper {
    max-width: 100%;
  }
}
</style>
