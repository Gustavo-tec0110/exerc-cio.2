const { createApp } = Vue;

createApp({
  data() {
    return {
      numeroA: 0,
      numeroB: 0,
      operacao: "+"
    };
  },
  computed: {
    resultado() {
      const a = Number(this.numeroA);
      const b = Number(this.numeroB);

      switch (this.operacao) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return b === 0 ? "Indefinido" : a / b;
        default:
          return 0;
      }
    }
  }
}).mount("#app");
