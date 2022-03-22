<template>
  <div id="app">
    <Header v-if="!hideIn" />
    <transition mode="out-in">
      <router-view />
    </transition>
    <Footer v-if="!hideIn" />
  </div>
</template>
<script>
import Footer from "@/components/Basics/Footer.vue";
import Header from "@/components/Basics/Header.vue";

export default {
  components: { Footer, Header },
  computed: {
    hideIn() {
      return this.$route.path
        .split("/")
        .filter((r) => r)
        .map((r) => ["dashboard"].includes(r.toLowerCase()))
        .includes(true);
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-thumb {
  background: var(--background-fading);
  border: 0px none var(--background-fading);
  border-radius: 50px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}

::-webkit-scrollbar-thumb:active {
  background: var(--activated);
}

::-webkit-scrollbar-track {
  background: transparent;
  border: 0px none var(--text-lighted);
  border-radius: 50px;
}

::-webkit-scrollbar-track:hover {
  background: var(--background-fading);
}

::-webkit-scrollbar-track:active {
  background: transparent;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

:root {
  --background-primary: #091231;
  --background-secondary: #333c88;
  --background-tertiary: #40cee3;
  --background-fading: #1d2d5f;
  --lighted: rgba(253, 94, 76, 0.933);
  --background-gradient: linear-gradient(
    90deg,
    #050939 0%,
    #0d1768 47.57%,
    #050939 93.19%
  );
  --activated: #4d4d44;
  --text-primary: #fff;
  --text-secondary: #242424;
  --text-lighted: #ffbc47;
  --default-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.4);
}

body,
html {
  background: var(--background-gradient);
  color: var(--text-primary);
  font-size: initial;
  line-height: initial;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  line-height: 1.8;
  overflow-wrap: break-word;
  scrollbar-width: thin;
  scrollbar-color: var(--background-fading) var(--background-primary);
  word-wrap: break-word;
}

::after,
::before {
  box-sizing: content-box;
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1;
}

main section {
  max-width: 1424px;
  margin: 50px auto;
}

section h2 {
  font-size: 2rem;
}

body,
ul,
li,
h1,
h2,
p {
  padding: 0px;
  margin: 0px;
  font-weight: revert;
  line-height: normal;
  color: inherit;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: var(--text-primary);
}

a:focus,
a:hover {
  text-decoration: none;
}

p {
  color: rgba(204, 204, 204);
}

p > span,
h2 > span {
  color: var(--text-lighted);
  font-weight: bold;
}

img {
  display: block;
  max-width: 100%;
}

input,
textarea {
  background-color: var(--text-primary);
  color: var(--background-primary);
  border: 1px solid #816d6d;
  padding: 6.4px;
  border-radius: 5px;
}

textarea {
  resize: vertical;
}

.btn {
  border-radius: 5px;
  background-color: var(--lighted);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.1s;
  border: none;
  color: var(--text-primary);
  text-transform: capitalize;
  width: min-content;
  padding: 10px 35px;
}

.btn:hover {
  color: var(--text-primary);
  background-color: rgba(234, 55, 35, 0.93);
  box-shadow: 0 0 20px -3px rgba(234, 55, 35, 0.93);
}

.hooper-next,
.hooper-prev {
  border-radius: 100%;
  cursor: pointer !important;
  background-color: var(--lighted) !important;
  color: var(--text-primary) !important;
  font-size: 0.3rem;
  opacity: 1 !important;
  box-shadow: 0 0 15px rgba(253, 94, 76, 0.32) !important;
  fill: var(--text-primary) !important;
}

.hooper-prev {
  left: -15px !important;
}

.hooper-next {
  right: -15px !important;
}

.colapse-wrapper {
  position: relative;
}

.colapse-content {
  background-color: var(--text-secondary);
  display: grid;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  border-radius: 5px;
  z-index: 11;
  padding: 5px 0;
  margin-top: 5px;
  position: absolute;
  right: 0;
  width: max-content;
}

.colapse-back {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  left: 0;
  top: 0;
}

.colapse-content * {
  font-size: 0.9rem;
  color: #ccc;
  padding: 10px 40px 10px 15px;
  cursor: pointer;
}

.colapse-content *:hover {
  background-color: var(--activated);
  color: var(--text-primary);
}

.alert-success,
.alert-error {
  position: fixed;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
  z-index: 9999999;
  background-color: var(--text-primary);
  color: var(--text-secondary);
  padding: 20px 65px;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s;
}

.alert-success::before {
  content: "\f058";
  color: green;
}

.alert-error::before {
  content: "\f057";
  color: red;
}

.alert-success::before,
.alert-error::before {
  font-size: 1.4rem;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 3px;
  width: 25%;
  height: 100%;
  display: grid;
  place-content: center;
}

.mini-icon {
  z-index: 2;
  background-color: var(--text-secondary);
  padding: 8px;
  border-radius: 7px;
  font-size: smaller;
  display: grid;
  place-content: center;
  position: relative;
  cursor: pointer;
}

.icon-grab {
  cursor: grab;
}

.mini-icon:hover {
  background-color: var(--background-fading);
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--activated);
  border-radius: 34px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.depositions .hooper-track {
  padding-left: 0.6rem;
}

.slider::before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 4px;
  bottom: 4px;
  border-radius: 50%;
  background-color: var(--text-primary);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--text-lighted);
}

input:checked + .slider::before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

@media screen and (max-width: 920px) {
  .hooper-prev {
    left: 0 !important;
  }

  .hooper-next {
    right: 0 !important;
  }

  .alert-error,
  .alert-success {
    width: 90%;
  }
}
</style>
