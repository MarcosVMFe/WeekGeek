const temas = [
  {
    n: "Naruto",
    t: ["shonen", "aventura"],
    d: "Um ninja que sonha em ser reconhecido por todos.",
  },
  {
    n: "One Piece",
    t: ["aventura", "shonen"],
    d: "Uma tripulação pirata em busca do maior tesouro.",
  },
  {
    n: "Dragon Ball",
    t: ["shonen"],
    d: "Lutas lendárias e a superação constante dos limites.",
  },
  {
    n: "Death Note",
    t: ["sombrio"],
    d: "Um caderno, um jogo mental e dilemas de justiça.",
  },
  {
    n: "Attack on Titan",
    t: ["sombrio", "aventura"],
    d: "Humanidade encurralada e escolhas sem volta.",
  },
  {
    n: "Jujutsu Kaisen",
    t: ["sombrio", "shonen"],
    d: "Maldições, feiticeiros e batalhas intensas.",
  },
  {
    n: "Demon Slayer",
    t: ["shonen", "aventura"],
    d: "Um irmão que luta para salvar a irmã.",
  },
  {
    n: "Tokyo Ghoul",
    t: ["sombrio"],
    d: "Identidade dividida entre dois mundos.",
  },
];

const lista = document.getElementById("lista");

function render(f) {
  lista.innerHTML = "";
  temas
    .filter((x) => f === "todos" || x.t.includes(f))
    .forEach((x) => {
      const c = document.createElement("div");
      c.className = "card";
      c.innerHTML =
        '<span class="tag">' +
        x.t.join(" · ") +
        "</span><h3>" +
        x.n +
        "</h3><p>" +
        x.d +
        "</p>";
      lista.appendChild(c);
    });
}

document.getElementById("filtros").addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  document
    .querySelectorAll("#filtros button")
    .forEach((b) => b.classList.remove("on"));
  e.target.classList.add("on");
  render(e.target.dataset.f);
});

document.getElementById("sortear").addEventListener("click", () => {
  const x = temas[Math.floor(Math.random() * temas.length)];
  document.getElementById("sugestao").textContent =
    "Procure um rap de " + x.n + " 🎤";
});

render("todos");
