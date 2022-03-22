<template>
  <div class="deposition">
    <div
      :style="{ 'background-image': `url('${deposition.image.link}')` }"
    ></div>
    <div>
      <p>{{ deposition.description }}</p>
      <div>
        <span>{{ deposition.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Deposition",
  props: ["deposition"],
};
</script>

<style scoped>
.deposition {
  width: clamp(100px, 285px, 285px);
  min-width: 285px;
  margin: 0.4rem !important;
  position: relative;
  z-index: 1;
  margin-top: 10%;
}

.deposition::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -1px;
  border-radius: 0.625rem;
  background: linear-gradient(
    0deg,
    rgba(224, 0, 102, 0) 21%,
    var(--background-tertiary) 45%,
    var(--background-secondary) 68%
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 1.1px;
}

.deposition > div:last-child {
  height: 100%;
  padding: 15px;
  display: flex;
  padding-top: 35%;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.625rem;
  position: relative;
  z-index: 2;
  background-color: transparent;
}

.deposition > div:first-child {
  position: absolute;
  width: 90%;
  overflow: hidden;
  height: 180px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 0;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
}

.deposition p {
  height: 305px;
  overflow-y: scroll;
  white-space: break-spaces;
  scrollbar-color: var(--background-fading) transparent;
  scrollbar-width: thin;
  margin-bottom: 35px;
  font-size: 0.95rem;
  line-height: 1.5;
  padding: 10px;
}

.deposition span {
  font-weight: bold;
  font-size: 1rem;
}

.deposition > div > div {
  display: flex;
  align-items: center;
}

@media (max-width: 852px) {
  .deposition {
    margin-top: 30%;
  }
}
</style>