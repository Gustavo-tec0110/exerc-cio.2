// animação suave ao rolar (extra segurança)
document.documentElement.style.scrollBehavior = "smooth";

// efeito de fade-in ao aparecer na tela
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section").forEach(sec => {
  sec.classList.add("hidden");
  observer.observe(sec);
});
