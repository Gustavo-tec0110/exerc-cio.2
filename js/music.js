const music = document.getElementById("music");
const btn = document.getElementById("music-btn");

music.volume = 0.4;
let started = false;

function startMusic() {
  if (started) return;

  music.play().then(() => {
    btn.textContent = "⏸ Música";
    started = true;
  }).catch(err => {
    console.log("Erro ao tocar:", err);
  });
}

/* desktop */
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("wheel", startMusic, { once: true });

/* mobile */
document.addEventListener("touchstart", startMusic, { once: true });

/* botão */
btn.addEventListener("click", (e) => {
  e.stopPropagation();

  if (music.paused) {
    music.play();
    btn.textContent = "⏸ Música";
  } else {
    music.pause();
    btn.textContent = "▶ Música";
  }
});
