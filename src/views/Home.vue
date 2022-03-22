<template>
  <main class="home">
    <section class="top-content">
      <article class="content-container">
        <h1>FAÇA PARTE DA TURMA <span>PRODUÇÃO</span> & <span>MERCADO 3D</span></h1>
        <p>
          O Produção & Mercado 3D já formou
          <span>centenas de novos profissionais no Mercado de Trabalho 3D.</span>
          São mais de 100 aulas entre produções técnicas, artísticas e um dos Módulos que
          faz mais sucesso no P&M3D, o Mercado de trabalho.
        </p>
        <a v-if="config && config.value" class="btn" :href="config.link"
          >Quero fazer parte!</a
        >
        <div class="subscription-closed" v-else>
          <a class="btn disabled">Inscrições encerradas</a>
          <a href="#subscribe">Quero ser notificado quando abrirem novas vagas</a>
        </div>
      </article>
      <img src="@/assets/mockup-home.png" />
    </section>
    <section class="modules">
      <article class="title">
        <h2>
          O curso que você precisa para avançar no 3D e se tornar um
          <br /><span>profissional mais capacitado e empreendedor!</span>
        </h2>
        <p class="sub-title-desk">
          Temos a solução certa para você. São mais de 100 aulas, com conteúdos como
          Material para iniciantes, Módulo de Asset Completo, desde a referência até
          animação de câmera e foco, Cenário, Lookdev de Personagens, Packshots e muito
          mais.
        </p>
      </article>
      <Modules />
    </section>
    <section class="how-work">
      <article class="how-work-container">
        <div>
          <h2>O que você está esperando?</h2>
          <p>
            Em apenas 3 meses, já éramos mais de 200 alunos na plataforma e conectados em
            nosso grupo secreto do Facebook. <br /><br />Na nossa comunidade, os alunos se
            ajudam o tempo todo em suas postagens, e eu disponibilizo uma tabela onde você
            pode colocar seus contatos profissionais e eu sempre estou indicando meus
            alunos que estão se destacando para trabalhos em studios, freelas ou para
            trabalhar diretamente comigo. Não Existe nada parecido com isso!<br /><br />Faça
            parte agora!
          </p>
          <a v-if="config && config.value" class="btn" :href="config.link"
            >Quero fazer parte!</a
          >
          <div class="subscription-closed" v-else>
            <a class="btn disabled">Inscrições encerradas</a>
            <a href="#subscribe">Quero ser notificado quando abrirem novas vagas</a>
          </div>
        </div>
        <img src="@/assets/home-macbook-desk.png" />
      </article>
    </section>
    <section class="depositions">
      <div>
        <h2>Nós fizemos a diferença na história dos nossos alunos</h2>
        <p>Veja como foi fundamental para a evolução e o amadurecimento deles</p>
      </div>
      <Depositions />
    </section>
    <Subscribe />
    <Faqs />
  </main>
</template>

<script>
import Modules from '@/components/Home/Modules.vue';
import Depositions from '@/components/Home/Depositions.vue';
import Subscribe from '@/components/Home/Subscribe.vue';
import Faqs from '@/components/Home/Faqs.vue';

import { api } from '@/services.js';

export default {
  name: 'Home',
  components: {
    Modules,
    Depositions,
    Subscribe,
    Faqs,
  },
  computed: {
    config() {
      const configs = this.$store.state.configs;
      if (configs && configs[0]) return configs.find(c => c._id == 'assignature').config;
      else return {};
    },
  },
  methods: {
    getConfigs() {
      api.get('/management/configs').then(r => {
        this.$store.commit('UPDATE_CONFIGS', r.data);
      });
    },
  },
  created() {
    this.getConfigs();
  },
};
</script>
<style scoped>
main {
  overflow-x: hidden;
}

main section {
  display: flex;
  align-items: center;
  padding-top: 0px;
  margin: auto;
  position: relative;
  z-index: 1;
  height: auto;
  padding-top: 70px;
  flex-direction: column;
}

main article {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-content: center;
}

h1 {
  font-size: 3.2rem;
  max-width: 515px;
}

h1 span {
  color: var(--text-lighted);
}

h2 ~ p {
  margin-top: 10px;
}

.btn {
  border-radius: 5px;
  background-color: #e69c1b;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.1s;
  border: none;
  color: var(--text-primary);
  padding: 1.3rem 0;
  width: 265px;
  text-transform: uppercase;
}

.btn:hover {
  background-color: #df981c;
  box-shadow: 0 0 20px -3px rgba(232, 163, 31, 0.93);
}

.top-content {
  display: flex;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  padding: 0;
  margin: auto;
  position: relative;
  z-index: 1;
  height: auto;
  padding-top: 70px;
  flex-direction: row;
}

.top-content > .content-container {
  width: 90%;
  height: 715px;
  max-width: 1640px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 5rem;
}

.top-content img {
  display: flex;
  position: absolute;
  width: 60%;
  right: -18px;
  top: 70px;
  z-index: -1;
  -o-object-fit: contain;
  object-fit: contain;
}

.top-content p {
  font-size: 1.2rem;
  padding: 15px 0 30px;
  line-height: 1.2;
  margin-top: 1.875rem;
  max-width: 78%;
  width: 30.63rem;
}

/* MODULES SECTION */

.modules .title {
  position: relative;
  bottom: 3rem;
}

.title p {
  font-size: 1.2rem;
  text-align: start;
  line-height: 1.2;
  margin-top: 1.875rem;
  max-width: 80%;
}

/* INSTRUCTOR SECTION */

.instructor img {
  width: 330px;
  min-width: 330px;
  max-width: 90vw;
  height: 330px;
  margin-right: 30px;
}

.instructor article {
  padding: 2rem;
  display: flex;
}

.instructor > article > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact {
  margin-top: 30px;
}

.contact a {
  font-size: 2rem;
  padding: 0 10px;
}

.contact a:hover i {
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  text-shadow: none;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

/* DEPOSITIONS SECTION */

.depositions {
  max-width: inherit;
}

.depositions > div:first-child {
  text-align: center;
  padding: 0 10px;
}

.depositions p {
  font-size: 1.1rem;
  margin-top: 5px;
}

.depositions-wrapper {
  display: flex;
  padding: 2rem;
  overflow-x: scroll;
  max-width: 100vw;
  scrollbar-width: thin;
  scrollbar-color: var(--background-secondary) transparent;
}

/* HOW-WORK SECTION */

.how-work {
  background-image: url('../assets/home-bg-posters.png');
  background-size: cover;
  background-repeat: no-repeat;
  margin: 3rem 0 9.75rem 0;
  max-width: 100vw;
}

.how-work-container {
  flex-direction: row;
  max-width: 1424px;
  position: relative;
  margin: auto;
}

.how-work-container div {
  max-width: 40.375rem;
}

.how-work-container img {
  width: 90%;
  top: 3.563rem;
  left: 16.125rem;
  position: absolute;
  display: inherit;
  top: 1.563rem;
  left: 18.125rem;
  height: 498px;
  z-index: 10;
  object-fit: contain;
  z-index: -1;
}

.how-work h2 {
  font-size: 4.125rem;
}

.how-work p {
  font-size: 1.25rem;
  margin-bottom: 30px;
}

.subscription-closed {
  display: flex;
  flex-direction: column;
}

.subscription-closed > a:not(a.disabled) {
  margin-top: 20px;
  margin-left: 5px;
  color: var(--text-lighted);
  text-decoration: underline;
}

@media (max-width: 724px) {
  .content-container {
    width: 100%;
    padding: 30px;
    word-break: break-word;
    margin-top: 0;
    margin-bottom: -5rem;
  }

  .top-content img {
    width: 100%;
    right: 0;
    opacity: 0.6;
  }

  .top-content article {
    margin-right: 0;
  }

  h1 {
    font-size: 1.6rem;
    margin-top: 40px;
  }

  .instructor article {
    flex-direction: column;
  }

  .instructor img {
    margin-bottom: 20px;
    margin-right: 0;
  }

  .how-work-container img {
    display: none;
  }
}

@media (max-width: 1024px) {
  .how-work-container {
    flex-direction: column;
  }

  .how-work-container img {
    position: inherit;
    top: inherit;
    left: inherit;
  }

  .how-work {
    margin-bottom: 1rem;
  }

  .how-work h2 {
    font-size: 2rem;
  }

  .how-work p {
    font-size: 1rem;
  }
}
</style>
