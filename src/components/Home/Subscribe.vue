<template>
  <section class="subscribe" id="subscribe">
    <article>
      <div>
        <h2>Ficou interessado?</h2>
        <p>
          Informe seu email para receber todas as novidades sobre o P&M3D.
          <br /><br />Quando abrirem novas turmas, lançamento de novos módulos,
          materiais gratuitos e muito mais.
        </p>
      </div>
      <form id="subscribe-form">
        <input
          type="email"
          name="subscribe"
          id="subscribe-mail"
          placeholder="Seu e-mail"
          v-model.lazy="email"
          required
        />
        <button
          type="submit"
          class="btn"
          id="subscribe-button"
          @click.prevent="
            validity(['#subscribe-mail'])
              ? subscribe()
              : sendAlert('Email inválido!', false, 'error')
          "
        >
          ASSINE AGORA
        </button>
      </form>
    </article>
  </section>
</template>

<script>
import alert from "@/mixins/alert.js";
import { api } from "@/services.js";

export default {
  name: "Subscribe",
  mixins: [alert],
  data() {
    return {
      email: "",
    };
  },
  methods: {
    subscribe() {
      api
        .post("/management/subscriptions", { _id: this.email })
        .then(() => {
          this.sendAlert("Inscrito com sucesso!", false, "success");
        })
        .catch(() => {
          this.sendAlert("Email já cadastrado!", false, "error");
        });

      this.email = "";
    },
  },
};
</script>

<style scoped>
.subscribe article {
  display: flex;
  place-content: center;
  justify-content: space-around;
}

.subscribe div {
  width: 35%;
}

.subscribe h2 {
  font-size: 2.2rem;
}

.subscribe p {
  font-size: 1.25rem;
  margin-top: 15px;
}

.subscribe input[type="email"] {
  width: 100%;
  border: solid 1px #020a13;
  color: #fff;
  font-size: 18px;
  background: #03152e;
  margin-bottom: 1.25rem;
  height: 60px;
  padding-left: 25px;
  outline: none;
  box-sizing: border-box;
  width: 60%;
  margin-right: 20px;
}

.btn {
  height: 60px;
  width: 50%;
  color: #f5f5f5;
  text-transform: uppercase;
  background: #072b5c;
  border: solid 2px #e0004d;
  font-size: 1rem;
  border-radius: 4px;
  transition: ease-in-out 0.2s;
}

.subscribe form {
  display: flex;
  width: 40%;
}

@media (max-width: 974px) {
  .subscribe article {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .subscribe div {
    width: 85%;
  }

  .subscribe form {
    margin-top: 30px;
    width: 90%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .subscribe input[type="email"] {
    width: 91%;
    margin-right: 0;
  }

  .btn {
    width: 70%;
  }
}
</style>