const cantores = [
  {
    n: "M4rkim",
    id: "m4rkim",
    foto: "assets/m4rkim.jpg",
    descricao: "© M4rkim",
    musicas: [],
    itunesId: "",
    tag: "Rap · Rock",
    estilo:
      "Rap nerd e geek music, com influências de rock e metal alternativo. Faz faixas sobre personagens de animes e games, como Blue Lock, Bleach, Jujutsu Kaisen e God of War.",
    },
  {
    n: "Enygma",
    id: "enygma",
    foto: "assets/enygma.jpg",
    descricao: "",
    musicas: [],
    itunesId: "",
    tag: "Metal · Rock",
    estilo:
      "Conhecido por inovar na cena geek com o chamado “anime metal”, que une a energia do metal a temas de animes.",
  },
  {
    n: "Anny",
    id: "anny",
    foto: "assets/anny.jpg",
    descricao: "Bang.",
    musicas: ["Blue", "Parabellum"],
    itunesId: "",
    tag: "Pop",
    estilo:
      "Anny é uma artista da música geek brasileira, com faixas como Blue ou Parabellum.",
    },
  {
    n: "AniRap",
    id: "anirap",
    foto: "assets/anirap.jpg",
    descricao: "Insta: @anirap_oficial",
    musicas: [],
    itunesId: "",
    tag: "Rap · Trap",
    estilo:
      "Rap geek com bateria de trap, muitas referências de animes e refrões melódicos. É conhecido por criar o grupo URT.",
    },
  {
    n: "MHRAP",
    id: "mhrap",
    foto: "assets/mhrap.jpg",
    descricao: "Meu nome é Matheus Halequis e sou o criador do canal MHRAP.<br>Estaremos trabalhando para trazer vídeos para vocês durante toda a semana!<br>Siga-me no Instagram @MHRAPOFICIAL<p>Deus no comando!</p>",
    musicas: [],
    itunesId: "",
    tag: "Rap · Trap",
    estilo:
      "Considerado um dos principais nomes solo do rap geek no país, inspirado na trajetória do 7 Minutoz.",
  },
  {
    n: "7 Minutoz",
    id: "7-minutoz",
    foto: "assets/7mz.jpg",
    descricao: "Juntos, nós somos 7 Minutoz!",
    musicas: [],
    itunesId: "",
    tag: "Rap",
    estilo:
      "Grupo no ar desde 2012 e uma das maiores referências do rap geek brasileiro. As faixas mais famosas homenageiam Naruto, One Piece e Dragon Ball.",
  },
  {
    n: "Blxck",
    id: "blxck",
    foto: "assets/blxck.jpg",
    descricao: "❌",
    musicas: ["Anoitecer Cruel"],
    itunesId: "",
    tag: "Trap",
    estilo:
    "Canal recentemente criado, porém já é condecorado um dos melhores da cena, tendo crescido muito nos últimos meses com sons como Anoitecer Cruel.",
  },
  {
   n: "SlowGm",
    id: "SlowGm",
    foto: "assets/slowgm.jpg",
    descricao: "Olá, meu nome é João Vitor e eu faço música em diferentes estilos. Para mim, a música é como uma das maiores engrenagens do mundo, e saber que o que eu faço pode influenciar a rotina de alguém, tornar essa pessoa mais feliz e intensificar os sentimentos (mesmo que não de uma forma potencialmente impactante para alguns), torna o meu dia mais feliz e me motiva a continuar, encontrando assim um significado dentro de mim por trás de tanto esforço investido em cada composição.<br>Eu geralmente não trabalho muito com vídeos porque isso abala profundamente as raízes da minha criatividade.<br>Isso é um pouco sobre a minha personalidade artística. Obrigado por ler! ✨☕",
    musicas: [],
    itunesId: "",
    tag: "Pop",
    estilo:
    "Faz musicas com muita inspiração no pop, assim como muitos ele não fala diretamente sobre a obra que está retrantando, apenas passando sentimentos e referências a mesma.",
  },
  {
   n: "Oshaman",
    id: "Oshaman",
    foto: "assets/oshaman.jpg",
    descricao: "o proprio shamas",
    musicas: [],
    itunesId: "",
    tag: "Pop · Bossa Nova",
    estilo:
    "Traz musicas com maior foco em instrumental e uma voz limpa, sempre trazendo consigo um pouco de uma raiz brasileira em suas musicas.",
  },
  {
   n: "Chrono",
    id: "chrono",
    foto: "assets/chrono.jpg",
    descricao: "Chronologicamente avançado!",
    musicas: [],
    itunesId: "",
    tag: "Hip-Hop · Rap",
    estilo:
    "Traz musicas com grande ênfase na história dos personagens abordados, com raizes bem fortes no rap e hip-hop.",
  },
  {
   n: "HalaCG",
    id: "halacg",
    foto: "assets/halacg.jpg",
    descricao: "Hiii!<p>I'm Hala, a music producer/composer and singer/songwriter who loves some of the nerdiest things around! You can expect plenty of original songs and music inspired by pop culture here, as well as covers and cover remixes, so if you're into that kind of content then it might be worth subscribing to my channel ;P</p><p>Thanks for checking out my Youtube page! :D</p>",
    musicas: [],
    itunesId: "",
    tag: "Pop · Rock",
    estilo:
    "Faz conteúdo majoritariamente do jogo 'Honkai: Star Rail' chegando até a fazer parceria com a empresa do mesmo, sempre busca trazer uma musica que representa bem o personagem abordado.",
  },
  {
   n: "Novatroop",
    id: "novatroop",
    foto: "assets/novatroop.jpg",
    descricao: "Eu sou o Small, não venha aqui esperando mais do mesmo...",
    musicas: [],
    itunesId: "",
    tag: "Pop",
    estilo:
    "Suas musicas quase sempre são alheias ao tema trazendo apenas algumas referências da obra original, trazendo assim uma visão única sobre o personagem e sua história.",
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

// ---------- Músicas via iTunes + ranking (o visitante define a ordem) ----------
const MAX_MUSICAS = 10;
const VALIDADE_CACHE = 24 * 60 * 60 * 1000; // 24 horas
let tokenRanking = 0;
let audioAtual = null;
let botaoAtual = null;

function pararPrevia() {
  if (audioAtual) {
    audioAtual.pause();
    audioAtual = null;
  }
  if (botaoAtual) {
    botaoAtual.textContent = "▶";
    botaoAtual = null;
  }
}

function tocarPrevia(url, botao) {
  if (botaoAtual === botao) {
    pararPrevia();
    return;
  }
  pararPrevia();
  audioAtual = new Audio(url);
  botaoAtual = botao;
  botao.textContent = "⏸";
  audioAtual.addEventListener("ended", pararPrevia);
  audioAtual.play().catch(pararPrevia);
}

// A API do iTunes é consultada com o método "callback" (JSONP) descrito na documentação dela.
function chamarItunes(url) {
  return new Promise((resolve, reject) => {
    const nomeCb = "itunesCb" + Date.now() + Math.floor(Math.random() * 1000);
    const script = document.createElement("script");
    const limpar = () => {
      clearTimeout(timer);
      delete window[nomeCb];
      script.remove();
    };
    const timer = setTimeout(() => {
      limpar();
      reject(new Error("tempo esgotado"));
    }, 10000);
    window[nomeCb] = (dados) => {
      limpar();
      resolve(dados);
    };
    script.onerror = () => {
      limpar();
      reject(new Error("falha na rede"));
    };
    script.src = url + "&callback=" + nomeCb;
    document.head.appendChild(script);
  });
}

function lerCache(c) {
  try {
    const bruto = JSON.parse(localStorage.getItem("itunes-" + c.itunesId));
    if (
      bruto &&
      Date.now() - bruto.t < VALIDADE_CACHE &&
      Array.isArray(bruto.faixas) &&
      bruto.faixas.length
    ) {
      return bruto.faixas;
    }
  } catch (e) {}
  return null;
}

function salvarCache(c, faixas) {
  try {
    localStorage.setItem(
      "itunes-" + c.itunesId,
      JSON.stringify({ t: Date.now(), faixas: faixas }),
    );
  } catch (e) {}
}

async function buscarFaixasItunes(c) {
  const emCache = lerCache(c);
  if (emCache) return emCache;

  const url =
    "https://itunes.apple.com/lookup?id=" +
    encodeURIComponent(c.itunesId) +
    "&entity=song&country=br&limit=" +
    MAX_MUSICAS * 4;
  const dados = await chamarItunes(url);

  const vistos = new Set();
  const faixas = [];
  (dados.results || []).forEach((r) => {
    if (r.wrapperType !== "track" || r.kind !== "song") return;
    const chave = normalizar(r.trackName || "");
    if (!chave || vistos.has(chave)) return; // evita versões repetidas
    vistos.add(chave);
    faixas.push({
      id: String(r.trackId),
      titulo: r.trackName,
      previewUrl: r.previewUrl || "",
      link: r.trackViewUrl || "",
    });
  });

  const lista = faixas.slice(0, MAX_MUSICAS);
  if (lista.length) salvarCache(c, lista);
  return lista;
}

function chaveRanking(c) {
  return "ranking-" + c.id;
}

function lerRanking(c, faixas) {
  let salvo = [];
  try {
    const bruto = JSON.parse(localStorage.getItem(chaveRanking(c)));
    if (Array.isArray(bruto)) salvo = bruto;
  } catch (e) {}
  // mantém a ordem salva e coloca músicas novas no fim
  const porId = new Map(faixas.map((f) => [f.id, f]));
  const ordenadas = salvo.filter((id) => porId.has(id)).map((id) => porId.get(id));
  const resto = faixas.filter((f) => !salvo.includes(f.id));
  return ordenadas.concat(resto);
}

function salvarRanking(c, ordem) {
  try {
    localStorage.setItem(chaveRanking(c), JSON.stringify(ordem.map((f) => f.id)));
  } catch (e) {}
}

function criarBotaoMover(texto, rotulo, desativado, aoClicar) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = texto;
  b.setAttribute("aria-label", rotulo);
  b.disabled = desativado;
  b.addEventListener("click", aoClicar);
  return b;
}

function desenharRanking(c, ordem) {
  pararPrevia();
  const ol = document.getElementById("lista-ranking");
  ol.innerHTML = "";
  const refs = [];

  ordem.forEach((faixa, i) => {
    const li = document.createElement("li");
    li.className = "item-rank";

    const pos = document.createElement("span");
    pos.className = "pos";
    pos.textContent = i + 1;

    const nome = document.createElement("span");
    nome.className = "nome-musica";
    nome.textContent = faixa.titulo;
    if (faixa.link) {
      const a = document.createElement("a");
      a.className = "link-apple";
      a.href = faixa.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Apple Music ↗";
      nome.appendChild(a);
    }

    const mover = document.createElement("span");
    mover.className = "mover";
    if (faixa.previewUrl) {
      const play = criarBotaoMover("▶", "Ouvir prévia de " + faixa.titulo, false, () =>
        tocarPrevia(faixa.previewUrl, play),
      );
      mover.appendChild(play);
    }
    const sobe = criarBotaoMover("▲", "Subir " + faixa.titulo, i === 0, () =>
      moverMusica(c, ordem, i, -1),
    );
    const desce = criarBotaoMover(
      "▼",
      "Descer " + faixa.titulo,
      i === ordem.length - 1,
      () => moverMusica(c, ordem, i, 1),
    );
    mover.appendChild(sobe);
    mover.appendChild(desce);

    li.appendChild(pos);
    li.appendChild(nome);
    li.appendChild(mover);
    ol.appendChild(li);
    refs.push({ sobe, desce });
  });
  return refs;
}

function moverMusica(c, ordem, i, direcao) {
  const j = i + direcao;
  if (j < 0 || j >= ordem.length) return;
  [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  salvarRanking(c, ordem);
  const refs = desenharRanking(c, ordem);
  // mantém o foco no botão que a pessoa estava usando
  const alvo = refs[j];
  const preferido = direcao < 0 ? alvo.sobe : alvo.desce;
  const outro = direcao < 0 ? alvo.desce : alvo.sobe;
  (preferido.disabled ? outro : preferido).focus();
}

async function iniciarRanking(c) {
  const ol = document.getElementById("lista-ranking");
  const reset = document.getElementById("reset-ranking");
  const status = document.getElementById("status-ranking");
  const meuToken = ++tokenRanking;
  // músicas escritas à mão: usadas só se o iTunes não estiver configurado ou falhar
  const manuais = (c.musicas || []).map((t) => ({
    id: t,
    titulo: t,
    previewUrl: "",
    link: "",
  }));

  reset.hidden = true;
  ol.innerHTML = "";
  status.textContent = "";

  let faixas = [];
  let deuErro = false;
  let veioDoItunes = false;

  if (c.itunesId) {
    status.textContent = "Buscando músicas no iTunes…";
    try {
      faixas = await buscarFaixasItunes(c);
      veioDoItunes = faixas.length > 0;
    } catch (e) {
      deuErro = true;
    }
    if (meuToken !== tokenRanking) return; // a pessoa já abriu outra tela
  }
  if (!faixas.length) faixas = manuais;

  if (!faixas.length) {
    status.textContent = "";
    let msg = "Nenhuma música cadastrada ainda.";
    if (c.itunesId) {
      msg = deuErro
        ? "Não consegui carregar as músicas agora. Tente novamente mais tarde."
        : "Nenhuma música encontrada no iTunes para este artista.";
    }
    ol.innerHTML = '<li class="rank-vazio">' + msg + "</li>";
    return;
  }

  status.textContent = veioDoItunes
    ? "Músicas e prévias de 30 segundos via iTunes."
    : "";
  desenharRanking(c, lerRanking(c, faixas));
  reset.hidden = false;
  reset.addEventListener("click", () => {
    try {
      localStorage.removeItem(chaveRanking(c));
    } catch (e) {}
    desenharRanking(c, faixas.slice());
  });
}

function mostrarInicio() {
  tokenRanking++;
  pararPrevia();
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
  pararPrevia();
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
    '<div class="card"><h3>Descrição</h3><p class="descricao">' +
    (c.descricao || "Descrição em breve.") +
    "</p></div>" +
    '<div class="card"><h3>Meu ranking de músicas</h3>' +
    '<p class="dica">Use as setas para colocar as músicas na ordem que você preferir.</p>' +
    '<p class="status" id="status-ranking"></p>' +
    '<ol class="ranking" id="lista-ranking"></ol>' +
    '<button class="btn btn-sec btn-sm" id="reset-ranking">Restaurar ordem original</button></div>' +
    '<div class="acoes">' +
    '<a class="btn" href="#cantores">← Voltar</a> ' +
    '<a class="btn btn-sec" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' +
    encodeURIComponent(c.n) +
    '">Procurar no YouTube ↗</a></div>';

  detalhe.appendChild(topo);
  detalhe.appendChild(blocos);
  iniciarRanking(c);

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