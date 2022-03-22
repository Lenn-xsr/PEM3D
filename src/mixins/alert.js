export default {
  methods: {
    validity(arr) {
      let result = [];
      arr.forEach((e) => {
        result.push(document.querySelector(e).validity.valid);
      });
      return !result.includes(false);
    },
    sendAlert(msg, input, type) {
      const alert = document.createElement("small"),
        hasAlert = document.querySelector(`.alert-${type}`);

      if (hasAlert) return;

      alert.className = `fas alert-${type}`;
      alert.innerText = msg;

      if (input) input.after(alert);
      else {
        document.body.appendChild(alert);
      }
      setTimeout(() => alert.remove(), 10000);
    },
  },
};
