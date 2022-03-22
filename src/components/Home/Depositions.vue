<template>
  <hooper :settings="hooperSettings" group="depositions">
    <slide v-for="(deposition, indx) in depositions" :key="deposition._id" :index="indx">
      <Deposition :deposition="deposition" />
    </slide>
    <hooper-navigation slot="hooper-addons"></hooper-navigation>
  </hooper>
</template>

<script>
import 'hooper/dist/hooper.css';

import { mapActions, mapState } from 'vuex';
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';

import Deposition from '@/components/Home/Deposition.vue';

export default {
  name: 'Modules',
  components: { Hooper, Slide, HooperNavigation, Deposition },
  computed: {
    ...mapState(['depositions']),
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
    if (!this.depositions) this.managementGet({ route: 'DEPOSITIONS' });
  },
};
</script>

<style scoped>
.hooper {
  max-width: calc(318px * 3);
}

.hooper-slide {
  height: 100%;
  padding-top: 85px;
}

@media screen and (max-width: 1240px) {
  .hooper {
    width: calc(318px * 2);
  }
}

@media screen and (max-width: 920px) {
  .hooper-slide.is-active {
    display: grid;
    place-content: center;
    width: 95vw !important;
  }

  .hooper,
  .hooper-slide {
    max-width: 100vw !important;
  }

  .hooper-prev {
    left: 0 !important;
  }

  .hooper-next {
    right: 0 !important;
  }
}
</style>
