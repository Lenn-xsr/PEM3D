<template>
  <transition mode="out-in">
    <main class="management" v-if="authorized">
      <nav>
        <div class="sidenav">
          <div class="nav-top">
            <div class="smart-menu">
              <label for="smart-menu">
                <i class="fas fa-bars"></i>
              </label>
              <img src="@/assets/icon.svg" />
            </div>
            <img src="@/assets/icon.svg" />
          </div>
          <input
            type="checkbox"
            name="smart-menu"
            id="smart-menu"
            style="display: none"
          />
          <div class="nav-content" key="nav-content">
            <h6>Gerenciamento de conteúdo</h6>
            <ul>
              <li>
                <router-link :to="{ name: 'Configs' }"
                  ><i class="fas fa-cog"></i><span>Configurações</span></router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'Depositions' }"
                  ><i class="fas fa-user-check"></i><span>Depoimentos</span></router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'Subscriptions' }"
                  ><i class="fas fa-envelope-open-text"></i
                  ><span>Inscrições</span></router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'EditModules' }"
                  ><i class="fas fa-book"></i><span>Módulos</span></router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'Faqs' }"
                  ><i class="fas fa-question"></i><span>Faqs</span></router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <main class="auth-wrapper" v-else-if="!authorized">
      <section>
        <div class="auth-content">
          <div>
            <h1>Dashboard</h1>
          </div>
          <form>
            <div>
              <label for="username">Usuário</label>
              <input
                type="username"
                name="username"
                id="username"
                v-model="login.username"
                required
              />
            </div>
            <div>
              <label for="password">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                v-model="login.password"
                required
              />
            </div>
            <button
              class="btn btn-form"
              @click.prevent="
                validity(['#username', '#password'])
                  ? authorize()
                  : sendAlert('Preencha os campos corretamente.')
              "
            >
              Logar
            </button>
          </form>
        </div>
      </section>
    </main>
    <Loading v-else />
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import { api } from '@/services.js';

import alert from '@/mixins/alert.js';

export default {
  name: 'Dashboard',
  mixins: [alert],
  data() {
    return {
      authorized: false,
      login: {
        username: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    validity(arr) {
      let result = [];
      arr.forEach(e => {
        result.push(document.querySelector(e).validity.valid);
      });
      return !result.includes(false);
    },
    async authorize() {
      try {
        const data = { ...this.login };
        const storage = window.localStorage.pem3d_dashboard;

        if (storage && storage != '') data.storage = JSON.parse(storage);

        await api.post('/management/auth', data).then(res => {
          if (res.data.storage)
            window.localStorage.setItem(
              'pem3d_dashboard',
              JSON.stringify(res.data.storage)
            );

          this.authorized = true;
        });
      } catch ({
        response: {
          data: { message },
        },
      }) {
        this.sendAlert(message);
        window.localStorage.removeItem('pem3d_dashboard');
      }
    },
  },
  created() {
    if (window.localStorage.pem3d_dashboard) this.authorize();
  },
};
</script>

<style scoped>
.management {
  display: flex;
}

.loading {
  flex: 1;
}

.management section {
  padding: 2rem;
  width: 100%;
  overflow-y: scroll;
  max-height: 100vh;
  scrollbar-width: thin;
  scrollbar-color: var(--background-fading) transparent;
  margin: 0 auto;
}

nav,
.sidenav {
  width: 100%;
  max-width: 15.625rem;
}

nav {
  flex-shrink: 1;
}

.sidenav {
  background-image: linear-gradient(
    to bottom right,
    var(--background-primary),
    var(--background-fading)
  );
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  position: fixed;
}

.auth-wrapper {
  padding: 0 20px;
  display: grid;
  place-content: center;
  align-self: center;
  width: 100%;
}

.auth-wrapper section {
  background-image: linear-gradient(to bottom right, #fb9151, rgba(236, 88, 74, 0.32)),
    url(../../assets/home-bg-posters.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: inherit;
  width: 80vw;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  max-width: 735px;
  display: flex;
  place-content: center;
  align-items: center;
  justify-content: space-between;
}

.auth-content {
  background-color: var(--text-primary);
  color: var(--activated);
  height: calc(100% - 20px);
  width: 50%;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.auth-content > div:first-child {
  padding: 10px;
  text-align: center;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
}

.auth-content > button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: var(--text-primary);
  background-color: var(--activated);
}

form {
  display: grid;
  gap: 10px;
  padding: 10px;
}

form div {
  display: grid;
}

.btn-form {
  margin: 10px auto 0 3px;
}

.nav-content .router-link-exact-active {
  color: var(--text-primary);
}

.nav-content a:hover {
  color: var(--text-primary);
}

.nav-content {
  padding: 0 1.5rem;
}

.nav-content h6 {
  text-transform: uppercase;
  font-size: 0.6rem;
  color: #717171;
  font-weight: bold;
  margin: 0;
  margin-top: 1rem;
}

.nav-content ul {
  margin-top: 1.25rem;
  font-size: 0.9375rem;
}

.nav-content ul li {
  margin-top: 1rem;
}

.nav-content ul i {
  width: 20px;
}

.nav-content ul li a {
  display: flex;
  align-items: center;
  color: #b9b9b9;
}

.nav-content ul li span {
  margin-left: 0.625rem;
  font-size: 0.9375rem;
}

.nav-top > img {
  max-height: 3rem;
  margin: 2rem auto 2.4rem;
}

.smart-menu {
  display: none;
  position: relative;
  justify-content: center;
  height: 55px;
  padding: 10px;
}

.smart-menu i {
  font-size: 30px;
  padding: 2px 0 0 10px;
  cursor: pointer;
  position: absolute;
  left: 10px;
}

@media (max-width: 930px) {
  .auth-wrapper section {
    flex-direction: column;
    width: 90vw;
    min-height: 300px;
    height: max-content;
  }

  .auth-wrapper section figure > img {
    width: 300px;
  }

  .auth-content {
    min-height: 500px;
    width: calc(100% - 20px);
    max-height: 80vh;
  }

  .management {
    flex-direction: column;
  }

  .nav-top > img {
    display: none;
  }

  .smart-menu {
    display: flex;
  }

  nav {
    height: 55px;
    max-width: inherit;
  }

  .sidenav {
    height: 55px;
    overflow: inherit;
    position: absolute;
    max-width: inherit;
  }

  .nav-content {
    position: absolute;
    z-index: 9999;
    display: none;
    background-color: #1b021f;
    width: 100%;
    padding-bottom: 20px !important;
    border-radius: 0 0 15px 15px;
  }

  #smart-menu:checked + .nav-content {
    display: block;
  }
}
</style>
