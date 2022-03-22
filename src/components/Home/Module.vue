<template>
  <div class="module-wrapper" :title="md.title">
    <img :src="md.image.link" :alt="md.title" />
    <div class="module-content">
      <h3>{{ md.subtitle }}</h3>
      <ul class="module-lessons">
        <li
          v-for="lesson in md.lessons"
          :key="lesson"
          class="module-lesson"
          v-html="lessonfy(lesson)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { lessonfy } from "@/helpers.js";

export default {
  name: "Module",
  props: ["md"],
  methods: {
    lessonfy,
  },
};
</script>

<style scoped>
.module-wrapper {
  position: relative;
  max-height: 100%;
  height: 100%;
  min-width: 355px;
}

.module-wrapper img {
  width: 100%;
  height: 100%;
  background-color: var(--background-primary);
  min-height: inherit;
  object-fit: fill;
}

.module-content {
  position: absolute;
  z-index: 1;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #21212198;
  display: flex;
  opacity: 0;
  flex-direction: column;
  transition: ease-in 0.2s;
}

.module-content h3 {
  padding: 10px 20px;
  background-color: var(--lighted);
  font-size: 1.3rem;
  margin-bottom: 0;
}

.module-content li,
.module-content h3 {
  pointer-events: none;
}

.module-wrapper:hover .module-content {
  opacity: 1;
}

.module-lessons {
  overflow: hidden;
  overflow-y: auto;
  padding: 0 20px;
  scrollbar-width: thin;
  margin-bottom: 20px;
}

.module-lesson {
  font-size: 0.9rem;
  margin-bottom: 5px;
  padding: 5px;
  padding-left: 0;
}
</style>