const cantores = [
{
    n: "M4rkim",
    foto: "assets/m4rkim.jpg",
    tag: "Rap · Rock",
    estilo:
      "Rap nerd e geek music, com influências de rock e metal alternativo. Faz faixas sobre personagens de animes e games, como Blue Lock, Bleach, Jujutsu Kaisen e God of War.",
    metodo:
      "Letras que contam a história do personagem, com batidas pesadas e muitas parcerias com outros nomes da cena, como Kaito Rapper e MHRAP.",
  },
  {
    n: "Enygma",
    foto: "assets/enygma.jpg",
    tag: "Metal · Rock",
    estilo:
      "Conhecido por inovar na cena geek com o chamado “anime metal”, que une a energia do metal a temas de animes.",
    metodo:
      "Guitarras pesadas e vocais intensos no lugar da batida clássica do rap, em homenagens a obras e personagens.",
  },
  {
    n: "Anny",
    foto: "assets/anny.jpg",
    tag: "Pop",
    estilo:
      "Anny é uma artista da música geek brasileira, com faixas como Blue ou Parabellum.",
    metodo:
      "Não possui um tipo próprio, porém visa trazer músicas mais subjetivas ao invés de contar a história do personagem"
  },
  {
    n: "AniRap",
    foto: "assets/anirap.jpg",
    tag: "Rap · Trap",
    estilo:
      "Rap geek com bateria de trap, muitas referências de animes e refrões melódicos. É conhecido por criar o grupo URT.",
    metodo:
      "Refrões pensados para o público cantar junto, em faixas centradas em personagens.",
  },
  {
    n: "MHRAP",
    foto: "assets/mhrap.jpg",
    tag: "Rap · Trap",
    estilo:
      "Considerado um dos principais nomes solo do rap geek no país, inspirado na trajetória do 7 Minutoz.",
    metodo:
      "Raps dedicados a animes e personagens, foi o primeiro a trazer o estilo de Trap para o mundo geek com músicas inspiradas em personagens.",
  },
  {
    n: "7 Minutoz",
    foto: "assets/7mz.jpg",
    tag: "Grupo · Rap",
    estilo:
      "Grupo no ar desde 2012 e uma das maiores referências do rap geek brasileiro. Possuindo atualmente a musica geek com mais views no youtube.",
    metodo:
      "Raps em equipe, com vários artistas na mesma música, e vídeos com forte identidade de anime.",
  },
  {
    n: "Blxck",
    foto: "assets/blxck.jpg",
    tag: "Trap",
    estilo:
    "Canal recentemente criado, porém já é condecorado um dos melhores da cena, tendo crescido muito nos últimos meses com sons como Anoitecer Cruel",
    metodo: 
    "Musicas dedicadas a personagens com um grande ênfase no story-telling e um forte foco em 'flows'",
  },
  {
    n: "SlowGM",
    foto: "assets/slowgm.jpg",
    tag: "Pop",
    estilo:
      "SlowGm é um artista que visa trazer visões mais interpretátivas de obras menos famosas como jogos indies, por exemplo: Moutwash ou Little Missfortune.",
    metodo:
      "Não possui um tipo próprio, porém visa trazer músicas mais subjetivas ao invés de contar a história do personagem"
  },
  {
    n: "oShaman",
    foto: "assets/oshaman.jpg",
    tag: "Pop · Bossa Nova",
    estilo:
      "oShaman é um artista que busca menos story-telling e mais a essência da obra retratando muitas musicas em estilos com raizes fortes brasileiras",
    metodo:
      "Mais focado em cantar com uma voz limpa e um instrumental que guia o ritmo da musica"
  },
];

const lista = document.getElementById("lista");
const busca = document.getElementById("busca");
const vazio = document.getElementById("vazio");

function normalizar(t) {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function criarAvatar(c) {
  const inicial = document.createElement("div");
  inicial.className = "avatar avatar-inicial";
  inicial.textContent = c.n.charAt(0).toUpperCase();
  if (!c.foto) return inicial;

  const img = document.createElement("img");
  img.className = "avatar";
  img.src = c.foto;
  img.alt = "Foto de perfil de " + c.n;
  img.loading = "lazy";
  img.addEventListener("error", () => img.replaceWith(inicial));
  return img;
}

function render(termo) {
  const q = normalizar(termo.trim());
  lista.innerHTML = "";
  const achados = cantores.filter((c) =>
    normalizar(c.n + " " + c.tag + " " + c.estilo + " " + c.metodo).includes(q),
  );
  achados.forEach((c) => {
    const card = document.createElement("div");
    card.className = "card";

    const topo = document.createElement("div");
    topo.className = "topo";
    topo.appendChild(criarAvatar(c));

    const info = document.createElement("div");
    info.innerHTML =
      '<span class="tag">' + c.tag + "</span><h3>" + c.n + "</h3>";
    topo.appendChild(info);

    const corpo = document.createElement("div");
    corpo.innerHTML =
      "<h4>Estilo</h4><p>" +
      c.estilo +
      "</p>" +
      "<h4>Como canta</h4><p>" +
      c.metodo +
      "</p>" +
      '<a class="yt" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' +
      encodeURIComponent(c.n) +
      '">Procurar no YouTube ↗</a>';

    card.appendChild(topo);
    card.appendChild(corpo);
    lista.appendChild(card);
  });
  vazio.hidden = achados.length > 0;
}

busca.addEventListener("input", () => render(busca.value));

document.getElementById("sortear").addEventListener("click", () => {
  const c = cantores[Math.floor(Math.random() * cantores.length)];
  document.getElementById("sugestao").textContent =
    "Que tal ouvir " + c.n + "? 🎤";
});

render("");
