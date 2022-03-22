<template>
  <hooper :settings="hooperSettings" group="modules">
    <slide v-for="(md, indx) in modules" :key="md._id" :index="indx">
      <Module :md="md" />
    </slide>
    <hooper-navigation slot="hooper-addons"></hooper-navigation>
  </hooper>
</template>

<script>
import 'hooper/dist/hooper.css';

import { mapActions, mapState } from 'vuex';
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';

import Module from '@/components/Home/Module.vue';

export default {
  name: 'Modules',
  components: { Module, Hooper, Slide, HooperNavigation },
  computed: {
    ...mapState(['modules']),
  },
  data() {
    return {
      hooperSettings: {
        centerMode: false,
        trimWhiteSpace: true,
        breakpoints: {
          724: {
            itemsToShow: 1,
          },
          921: {
            itemsToShow: 2,
          },
          1241: {
            itemsToShow: 3,
          },
        },
      },
    };
  },
  methods: {
    ...mapActions(['managementGet']),
  },
  created() {
    if (!this.modules) this.managementGet({ route: 'MODULES' });
  },
};
</script>

<style scoped>
.hooper {
  height: 630px;
  max-width: calc(365px * 3);
}

.hooper-slide {
  height: 100%;
}

@media screen and (max-width: 1240px) {
  .hooper {
    width: calc(370px * 2);
  }
}

@media screen and (min-width: 921px) {
  .hooper-slide {
    max-height: 80vh;
    margin-right: 13px;
    width: 355px !important;
  }
}

@media screen and (max-width: 920px) {
  .hooper-slide.is-active {
    display: grid;
    place-content: center;
  }

  .is-next {
    opacity: 0;
  }

  .hooper-slide {
    margin: 0;
  }

  .hooper {
    width: 95vw !important;
  }

  .hooper-prev {
    left: 0 !important;
  }

  .hooper-next {
    right: 0 !important;
  }
}
</style>
