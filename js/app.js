const githubUser = "FlaviaaMenegossi";

const avatarEl = document.querySelector("#avatar");
const nameEl = document.querySelector("#name");
const usernameEl = document.querySelector("#username");
const reposEl = document.querySelector("#repos");
const followersEl = document.querySelector("#followers");
const followingEl = document.querySelector("#following");
const profileLinkEl = document.querySelector("#profile-link");
const messageEl = document.querySelector("#message");

async function carregarPerfil() {
  try {
    const resposta = await fetch(`https://api.github.com/users/${githubUser}`);

    if (!resposta.ok) {
      throw new Error("Nao foi possivel buscar os dados do usuario.");
    }

    const dados = await resposta.json();

    avatarEl.src = dados.avatar_url;
    nameEl.textContent = dados.name || "Sem nome";
    usernameEl.textContent = `@${dados.login}`;
    reposEl.textContent = dados.public_repos;
    followersEl.textContent = dados.followers;
    followingEl.textContent = dados.following;
    profileLinkEl.href = dados.html_url;
    messageEl.textContent = "";
  } catch (erro) {
    nameEl.textContent = "Erro ao carregar";
    usernameEl.textContent = "@indisponivel";
    reposEl.textContent = "-";
    followersEl.textContent = "-";
    followingEl.textContent = "-";
    profileLinkEl.removeAttribute("href");
    messageEl.textContent = "Falha na requisicao Ajax. Tente novamente mais tarde.";
    console.error("Erro na requisicao:", erro);
  }
}

carregarPerfil();
