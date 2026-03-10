const alunos = [
  { nome: "Ana Clara", nota: 8.5 },
  { nome: "Bruno Lima", nota: 5.4 },
  { nome: "Camila Souza", nota: 9.1 },
  { nome: "Diego Santos", nota: 6.0 },
  { nome: "Eduarda Alves", nota: 4.8 }
];

const listaAlunos = document.getElementById("lista-alunos");
const listaAprovados = document.getElementById("lista-aprovados");
const totalAlunos = document.getElementById("total-alunos");
const totalAprovados = document.getElementById("total-aprovados");

const filtrarAprovados = (listaDeAlunos) => listaDeAlunos.filter((aluno) => aluno.nota >= 6);

const aprovados = filtrarAprovados(alunos);

const criarCardAluno = (aluno) => {
  const classeNota = aluno.nota >= 6 ? "student-score" : "student-score warning";
  const status = aluno.nota >= 6 ? "Aprovado" : "Reprovado";

  return `
    <article class="student-card">
      <h3>${aluno.nome}</h3>
      <p>Status: ${status}</p>
      <span class="${classeNota}">Nota: ${aluno.nota.toFixed(1)}</span>
    </article>
  `;
};

const renderizar = () => {
  listaAlunos.innerHTML = alunos.map(criarCardAluno).join("");
  listaAprovados.innerHTML = aprovados.map(criarCardAluno).join("");
  totalAlunos.textContent = alunos.length;
  totalAprovados.textContent = aprovados.length;
};

renderizar();
