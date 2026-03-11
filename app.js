const { useMemo, useState } = React;

const faixas = [
  { min: 0, max: 18.4, label: "Abaixo do peso" },
  { min: 18.5, max: 24.9, label: "Peso normal" },
  { min: 25.0, max: 29.9, label: "Sobrepeso" },
  { min: 30.0, max: 34.9, label: "Obesidade grau I" },
  { min: 35.0, max: 39.9, label: "Obesidade grau II" },
  { min: 40.0, max: Infinity, label: "Obesidade grau III" }
];

function App() {
  const [altura, setAltura] = useState(1.7);
  const [peso, setPeso] = useState(70);

  const imc = useMemo(() => {
    const h = Number(altura);
    const p = Number(peso);

    if (!h || !p) {
      return null;
    }

    return p / (h * h);
  }, [altura, peso]);

  const classificacao = useMemo(() => {
    if (imc === null) {
      return null;
    }

    return faixas.find((faixa) => imc >= faixa.min && imc <= faixa.max) || null;
  }, [imc]);

  const imcFormatado = imc === null ? "--" : imc.toFixed(2);
  const labelClassificacao = classificacao ? classificacao.label : "Preencha os campos";

  return (
    <main className="page">
      <section className="card">
        <h1>Calculadora de IMC</h1>
        <p className="subtitle">
          Informe altura e peso para calcular o IMC automaticamente e ver a classificacao.
        </p>

        <div className="content">
          <div>
            <div className="form">
              <label>
                Altura (m)
                <input
                  type="number"
                  step="0.01"
                  value={altura}
                  onChange={(event) => setAltura(event.target.value)}
                />
              </label>
              <label>
                Peso (kg)
                <input
                  type="number"
                  step="0.1"
                  value={peso}
                  onChange={(event) => setPeso(event.target.value)}
                />
              </label>
            </div>

            <div className="result">
              <span>IMC</span>
              <strong>{imcFormatado}</strong>
              <span>{labelClassificacao}</span>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Faixa</th>
                  <th>Classificacao</th>
                </tr>
              </thead>
              <tbody>
                {faixas.map((faixa) => {
                  const ativa = classificacao && classificacao.label === faixa.label;
                  const limite = faixa.max === Infinity ? "ou mais" : `ate ${faixa.max}`;
                  return (
                    <tr key={faixa.label} className={ativa ? "active" : ""}>
                      <td>{`${faixa.min} ${limite}`}</td>
                      <td>{faixa.label}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <aside className="contact">
            <div className="contact-card">
              <img className="avatar" src="imagem/nutricionista.jpeg" alt="Foto da nutricionista" />
              <p className="cta">
                Quer <span className="emphasis-mudar">MUDAR</span> ou <span className="emphasis-manter">MANTER</span> esse resultado?
              </p>
              <p className="cta">Entre em contato: 11 91234-5678</p>
              <span className="tag">Nutricionista</span>
              <p className="name">Marilia Feitosa</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
