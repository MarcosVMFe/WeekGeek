// Para adicionar a foto de um cantor, preencha o campo foto (ex.: foto: "assets/markim.jpg").

const cantores = [
  {
    n: "M4rkim",
    id: "m4rkim",
    foto: "assets/m4rkim.jpg",
    tag: "Rap · Rock",
    estilo:
      "Rap nerd e geek music, com influências de rock e metal alternativo. Faz faixas sobre personagens de animes e games, como Blue Lock, Bleach, Jujutsu Kaisen e God of War.",
    metodo:
      "Letras que contam a história do personagem, com batidas pesadas e muitas parcerias com outros nomes da cena, como Kaito Rapper e MHRAP.",
  },
  {
    n: "Enygma",
    id: "enygma",
    foto: "assets/enygma.jpg",
    tag: "Metal · Rock",
    estilo:
      "Conhecido por inovar na cena geek com o chamado “anime metal”, que une a energia do metal a temas de animes.",
    metodo:
      "Guitarras pesadas e vocais intensos no lugar da batida clássica do rap, em homenagens a obras e personagens.",
  },
  {
    n: "Anny",
    id: "anny",
    foto: "assets/anny.jpg",
    tag: "Pop",
    estilo:
      "Anny é uma artista da música geek brasileira, com faixas como Blue ou Parabellum.",
    metodo:
      "Possui um tipo próprio, porém visa trazer músicas mais subjetivas ao invés de contar a história do personagem"
  },
  {
    n: "AniRap",
    id: "anirap",
    foto: "assets/anirap.jpg",
    tag: "Rap · Trap",
    estilo:
      "Rap geek com bateria de trap, muitas referências de animes e refrões melódicos. É conhecido por criar o grupo URT.",
    metodo:
      "Refrões pensados para o público cantar junto, em faixas centradas em um personagem.",
  },
  {
    n: "MHRAP",
    id: "mhrap",
    foto: "assets/mhrap.jpg",
    tag: "Rap · Trap",
    estilo:
      "Considerado um dos principais nomes solo do rap geek no país, inspirado na trajetória do 7 Minutoz.",
    metodo:
      "Raps dedicados a animes e personagens, foi o primeiro a trazer o estilo de Trap para o mundo geek com músicas inspiradas em personagens.",
  },
  {
    n: "7 Minutoz",
    id: "7-minutoz",
    foto: "assets/7mz.jpg",
    tag: "Rap",
    estilo:
      "Grupo no ar desde 2012 e uma das maiores referências do rap geek brasileiro. As faixas mais famosas homenageiam Naruto, One Piece e Dragon Ball.",
    metodo:
      "Raps em equipe, com vários artistas na mesma música, e vídeos com forte identidade de anime.",
  },
  {
    n: "Blxck",
    id: "blxck",
    foto: "assets/blxck.jpg",
    tag: "Trap",
    estilo:
    "Canal recentemente criado, porém já é condecorado um dos melhores da cena, tendo crescido muito nos últimos meses com sons como Anoitecer Cruel",
  },
  {
   n: "SlowGm",
    id: "SlowGm",
    foto: "assets/slowgm.jpg",
    tag: "Pop",
    estilo:
    "",
  },
  {
   n: "Oshaman",
    id: "Oshaman",
    foto: "assets/oshaman.jpg",
    tag: "Pop · Bossa Nova",
    estilo:
    "Traz musicas com maior foco em instrumental e uma voz limpa, sempre trazendo consigo um pouco de uma raiz brasileira em suas musicas",
    metodo: 
    "Suas musicas são mais interpretativas à contar a história de um personagem, o que traz para si um público que não necessariamente precisa ter consumido a obra para apreciar",
  },
];

function criarAvatar(c, grande) {
  const inicial = document.createElement("div");
  inicial.className = "avatar avatar-inicial" + (grande ? " avatar-grande" : "");
  inicial.textContent = c.n.charAt(0).toUpperCase();
  if (!c.foto) return inicial;

  const img = document.createElement("img");
  img.className = "avatar" + (grande ? " avatar-grande" : "");
  img.src = c.foto;
  img.alt = "Foto de perfil de " + c.n;
  img.loading = "lazy";
  img.addEventListener("error", () => img.replaceWith(inicial));
  return img;
}

const lista = document.getElementById("lista");
const busca = document.getElementById("busca");
const vazio = document.getElementById("vazio");

function normalizar(t) {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
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
      '<a class="btn btn-sm" href="#cantor-' +
      encodeURIComponent(c.id) +
      '">Ver mais a fundo</a>';

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


const inicio = document.getElementById("inicio");
const telaCantor = document.getElementById("tela-cantor");
const detalhe = document.getElementById("detalhe");
const tituloPadrao = document.title;

function mostrarInicio() {
  telaCantor.hidden = true;
  inicio.hidden = false;
  document.title = tituloPadrao;
}

function mostrarCantor(id) {
  const c = cantores.find((x) => x.id === id);
  if (!c) {
    location.hash = "#cantores";
    return;
  }
  document.title = c.n + " – Rap Geek";
  detalhe.innerHTML = "";

  const topo = document.createElement("div");
  topo.className = "detalhe-topo";
  topo.appendChild(criarAvatar(c, true));

  const titulo = document.createElement("div");
  titulo.innerHTML = '<span class="tag">' + c.tag + "</span><h1>" + c.n + "</h1>";
  topo.appendChild(titulo);

  const blocos = document.createElement("div");
  blocos.innerHTML =
    '<div class="card"><h3>Estilo</h3><p>' + c.estilo + "</p></div>" +
    '<div class="acoes">' +
    '<a class="btn" href="#cantores">← Voltar</a> ' +
    '<a class="btn btn-sec" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' +
    encodeURIComponent(c.n) +
    '">Procurar no YouTube ↗</a></div>';

  detalhe.appendChild(topo);
  detalhe.appendChild(blocos);

  inicio.hidden = true;
  telaCantor.hidden = false;
  window.scrollTo(0, 0);
}

function rotear() {
  const h = location.hash;
  if (h.startsWith("#cantor-")) {
    mostrarCantor(decodeURIComponent(h.slice(8)));
    return;
  }
  mostrarInicio();
  const alvo = h.length > 1 ? document.getElementById(h.slice(1)) : null;
  if (alvo) alvo.scrollIntoView();
}

window.addEventListener("hashchange", rotear);
rotear();