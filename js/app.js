class Veiculo {
  constructor(modelo, marca, ano, tipoCombustivel) {
    if (new.target === Veiculo) {
      throw new Error("Veiculo e uma classe abstrata e nao pode ser instanciada diretamente.");
    }

    this.modelo = modelo;
    this.marca = marca;
    this.ano = ano;
    this.tipoCombustivel = tipoCombustivel;
  }

  descrever() {
    throw new Error("O metodo descrever precisa ser implementado pela classe filha.");
  }

  resumoBase() {
    return `${this.marca} ${this.modelo} (${this.ano})`;
  }
}

class Carro extends Veiculo {
  constructor(modelo, marca, ano, tipoCombustivel, portas, cambio) {
    super(modelo, marca, ano, tipoCombustivel);
    this.portas = portas;
    this.cambio = cambio;
  }

  descrever() {
    return `${this.resumoBase()} e um carro com ${this.portas} portas e cambio ${this.cambio}.`;
  }

  listarCaracteristicas() {
    return [
      { label: "Tipo", value: "Carro" },
      { label: "Combustivel", value: this.tipoCombustivel },
      { label: "Portas", value: this.portas },
      { label: "Cambio", value: this.cambio }
    ];
  }
}

class Moto extends Veiculo {
  constructor(modelo, marca, ano, tipoCombustivel, cilindradas, partidaEletrica) {
    super(modelo, marca, ano, tipoCombustivel);
    this.cilindradas = cilindradas;
    this.partidaEletrica = partidaEletrica;
  }

  descrever() {
    const partida = this.partidaEletrica ? "sim" : "nao";
    return `${this.resumoBase()} e uma moto de ${this.cilindradas}cc com partida eletrica: ${partida}.`;
  }

  listarCaracteristicas() {
    return [
      { label: "Tipo", value: "Moto" },
      { label: "Combustivel", value: this.tipoCombustivel },
      { label: "Cilindradas", value: `${this.cilindradas}cc` },
      { label: "Partida eletrica", value: this.partidaEletrica ? "Sim" : "Nao" }
    ];
  }
}

const frota = [
  new Carro("Corolla", "Toyota", 2024, "Flex", 4, "Automatico"),
  new Carro("Pulse", "Fiat", 2023, "Flex", 4, "CVT"),
  new Moto("Fazer", "Yamaha", 2022, "Gasolina", 250, true)
];

const listaVeiculos = document.getElementById("vehicle-list");
const resumo = document.getElementById("summary");

function criarCard(veiculo) {
  const caracteristicas = veiculo
    .listarCaracteristicas()
    .map((item) => `<li><strong>${item.label}:</strong> ${item.value}</li>`)
    .join("");

  return `
    <article class="vehicle-card">
      <span class="vehicle-tag">${veiculo.constructor.name}</span>
      <h3>${veiculo.modelo}</h3>
      <p class="vehicle-meta">${veiculo.marca} • ${veiculo.ano}</p>
      <p class="vehicle-description">${veiculo.descrever()}</p>
      <ul class="feature-list">${caracteristicas}</ul>
    </article>
  `;
}

function renderizarFrota() {
  listaVeiculos.innerHTML = frota.map(criarCard).join("");

  const carros = frota.filter((veiculo) => veiculo instanceof Carro).length;
  const motos = frota.filter((veiculo) => veiculo instanceof Moto).length;

  resumo.textContent = `Total de ${frota.length} instancias: ${carros} carros e ${motos} moto(s).`;
}

renderizarFrota();
