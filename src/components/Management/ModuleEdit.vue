<template>
  <div
    class="preview"
    v-if="preview && modulo && modulo._id != 'default'"
    @click="closePreview"
  >
    <div class="wrapper lock-width">
      <i class="far fa-times-circle close-icon" @click="closePreview"></i>
      <div class="content">
        <div>
          <Loading v-if="imageLoading" class="imageLoading" />
          <img :src="modulo.image.link" class="preview-image" />
          <input
            id="module"
            name="module"
            type="file"
            ref="module"
            @change="previewImage"
            accept="image/*"
            style="display: none"
          />
          <label for="module" class="label-upload"
            ><i class="far fa-edit cp-icon"></i
          ></label>
        </div>

        <div class="infos">
          <small>Titulo</small>
          <input
            type="text"
            name="title"
            v-model.lazy="modulo.title"
            :placeholder="modulo.title || 'Titulo'"
          />
          <small>Subtitulo</small>
          <input
            type="text"
            name="subtitle"
            v-model.lazy="modulo.subtitle"
            :placeholder="modulo.subtitle || 'Subtitulo'"
          />
        </div>
      </div>
      <div class="grid" :style="{ 'max-height': contentHeight }">
        <h2>Grade de aulas</h2>
        <draggable :list="modulo.lessons">
          <transition-group tag="ul" name="list">
            <li v-for="(lesson, key) in modulo.lessons" :key="lesson">
              <i
                class="fas fa-minus-circle remove-button"
                @click="removeIn('lessons', lesson)"
              ></i>
              <input
                type="text"
                name="lesson"
                :placeholder="lesson"
                v-model.lazy="modulo.lessons[key]"
              />
            </li>
          </transition-group>
        </draggable>
        <div class="add-lesson">
          <i
            class="fas fa-plus-circle add-button"
            @click="addIn('lessons', 'lesson')"
          ></i
          ><input
            type="text"
            placeholder="Adicionar aula"
            v-model.lazy="temp.lesson"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { api } from "@/services.js";
import draggable from "vuedraggable";

const moduleBase = {
  _id: "default",
  title: null,
  lessons: [],
  visible: true,
  image: { link: "" },
  subtitle: null,
};

export default {
  name: "ModuleEdit",
  props: ["md"],
  components: { draggable },
  data() {
    return {
      modulo: {
        _id: "default",
      },
      temp: {
        lesson: "",
      },
      contentHeight: "inherit",
      preview: false,
      imageLoading: false,
    };
  },
  methods: {
    addIn(where, key) {
      if (
        !this.modulo[where].includes(this.temp[key]) &&
        this.temp[key] != ""
      ) {
        const tempArr = [...this.modulo[where]];
        tempArr.push(this.temp[key]);
        this.modulo[where] = tempArr;
      }
    },
    removeIn(where, key) {
      this.modulo[where] = this.modulo[where].filter((value) => value != key);
    },
    closePreview({ target, currentTarget }) {
      if (target === currentTarget) {
        this.preview = false;
        this.modulo = { ...moduleBase };
        document.body.style.overflow = "";
      }
    },
    async updateModuleImage() {
      this.imageLoading = true;
      const form = new FormData();
      const file = this.$refs.module.files;

      if (file[0]) form.append(file[0].name, file[0]);

      form.append("_id", this.modulo._id);
      form.append("type", "Modules");
      form.append("field", "image");

      api.post("/management/image", form).then((response) => {
        this.imageLoading = false;
        this.modulo.image = response.data.image;
        this.managementUpdateOne({ payload: response.data, route: "MODULE" });
      });
    },
    previewImage() {
      const reader = new FileReader();
      const preview = document.querySelector(".preview-image");
      reader.onload = function (e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(this.$refs.module.files[0]);

      this.updateModuleImage();
    },
    ...mapActions(["managementUpdateOne"]),
  },
  watch: {
    md({ md, preview, _id }) {
      if (md) {
        this.modulo = { ...md };
      } else if (_id && !md) {
        this.modulo = { ...moduleBase, _id };
      }

      this.preview = preview;
      document.body.style.overflow = "hidden";
      if (preview) {
        setTimeout(() => {
          const height = document.querySelector(".content");
          this.contentHeight = height ? height.clientHeight + "px" : "inherit";
        }, 100);
      }
    },
    modulo: {
      handler(newObject, oldObject) {
        if (oldObject._id === newObject._id && newObject._id != "default")
          this.managementUpdateOne({ payload: newObject, route: "MODULE" });
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.preview {
  position: fixed;
  left: 0;
  top: 0;
  display: grid;
  place-content: center;
  width: 100%;
  height: 100%;
  background-color: #4d4d44b0;
  z-index: 10000;
  overflow-y: scroll;
  scrollbar-color: var(--text-lighted) transparent;
  scrollbar-width: thin;
}

.preview input,
.preview textarea {
  background-color: transparent;
  color: var(--text-primary);
  border: 0;
  width: 100%;
}

.preview textarea {
  min-height: 120px;
}

li,
.add-lesson {
  font-size: smaller;
  display: flex;
  align-items: center;
}

li i,
.add-lesson i {
  height: 30px;
  width: 30px;
  display: grid;
  place-content: center;
}

.close-icon {
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 22px;
  cursor: pointer;
}

.close-icon:hover {
  color: var(--activated);
}

.wrapper {
  margin: 10px 30px 10px 30px;
  display: flex;
  height: max-content;
  gap: 10px;
  padding-bottom: 10px;
  overflow: hidden;
  position: relative;
}

.infos h3 {
  font-weight: bold;
  font-size: 17px;
  margin-top: 0;
}

.infos p {
  font-size: 15px;
  padding: 5px;
}

.infos > input {
  margin-bottom: 15px;
}

.sub-infos {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.requeriments,
.basic-infos {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.requeriments > div,
.basic-infos > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.sub-infos small,
.infos > small {
  color: var(--text-lighted);
}

.sub-infos ul,
span {
  padding: 5px;
  font-size: 15px;
  list-style-type: disclosure-closed;
}

.content {
  height: -moz-available;
  width: clamp(200px, 800px, 1000px);
  display: flex;
}

.content img[data-v-3a0d89fc] {
  width: 100%;
  border-radius: 10px;
  min-height: 455px;
  background-color: var(--background-fading);
  min-width: 300px;
}

.content > div:first-child {
  position: relative;
}

.label-upload {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 22px;
  padding: 10px;
  margin: 0;
  cursor: pointer;
}

.grid {
  max-height: inherit;
  min-width: 300px;
  position: relative;
  margin-left: 5px !important;
  transition: all 0.2s;
}

.grid > div:first-of-type {
  height: 93%;
}

.grid ul {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #cecece;
  max-height: calc(100% - 30px);
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: var(--lighted) transparent;
  padding-left: 0;
}

.grid h2 {
  font-size: 0.9rem;
  color: var(--text-lighted);
}

.grid,
.infos {
  background-color: var(--background-primary);
  border-radius: 10px;
  padding: 15px;
  margin-left: 15px;
}

.remove-button,
.add-button {
  cursor: pointer;
}

.remove-button:hover {
  color: red;
}

.add-button:hover {
  color: green;
}

.plans div {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.plans input {
  height: 13px;
  max-width: 13px;
  display: inline-block;
  margin: 5px;
}

.plans label {
  margin: 0;
  font-weight: normal;
  padding-top: 3px;
}

.imageLoading {
  position: absolute;
  margin: 0 !important;
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(4, auto);
  background-color: #5e5e5e59;
  border-radius: 10px;
}

.add-lesson {
  position: absolute;
  bottom: 6px;
  width: 90%;
}

li i,
.add-lesson i {
  height: 30px;
  width: 30px;
  display: grid;
  place-content: center;
}

@media (max-width: 625px) {
  .preview {
    place-content: baseline;
  }

  .wrapper {
    flex-direction: column;
  }

  .content {
    width: inherit;
  }

  .grid,
  .grid ul {
    height: inherit;
  }

  .grid ul {
    max-height: 70vh;
  }
}
</style>