const cantores = [
  {
    n: "M4rkim",
    id: "m4rkim",
    foto: "assets/m4rkim.jpg",
    descricao: "© M4rkim",
    tag: "Rap · Rock",
    estilo:
      "Rap nerd e geek music, com influências de rock e metal alternativo. Faz faixas sobre personagens de animes e games, como Blue Lock, Bleach, Jujutsu Kaisen e God of War.",
    },
  {
    n: "Enygma",
    id: "enygma",
    foto: "assets/enygma.jpg",
    descricao: "",
    tag: "Metal · Rock",
    estilo:
      "Conhecido por inovar na cena geek com o chamado “anime metal”, que une a energia do metal a temas de animes.",
  },
  {
    n: "Anny",
    id: "anny",
    foto: "assets/anny.jpg",
    descricao: "Bang.",
    tag: "Pop",
    estilo:
      "Anny é uma artista da música geek brasileira, com faixas como Blue ou Parabellum.",
    },
  {
    n: "AniRap",
    id: "anirap",
    foto: "assets/anirap.jpg",
    descricao: "Insta: @anirap_oficial",
    tag: "Rap · Trap",
    estilo:
      "Rap geek com bateria de trap, muitas referências de animes e refrões melódicos. É conhecido por criar o grupo URT.",
    },
  {
    n: "MHRAP",
    id: "mhrap",
    foto: "assets/mhrap.jpg",
    descricao: "Meu nome é Matheus Halequis e sou o criador do canal MHRAP.<br>Estaremos trabalhando para trazer vídeos para vocês durante toda a semana!<br>Siga-me no Instagram @MHRAPOFICIAL<p>Deus no comando!</p>",
    tag: "Rap · Trap",
    estilo:
      "Considerado um dos principais nomes solo do rap geek no país, inspirado na trajetória do 7 Minutoz.",
  },
  {
    n: "7 Minutoz",
    id: "7-minutoz",
    foto: "assets/7mz.jpg",
    descricao: "Juntos, nós somos 7 Minutoz!",
    tag: "Rap",
    estilo:
      "Grupo no ar desde 2012 e uma das maiores referências do rap geek brasileiro. As faixas mais famosas homenageiam Naruto, One Piece e Dragon Ball.",
  },
  {
    n: "Blxck",
    id: "blxck",
    foto: "assets/blxck.jpg",
    descricao: "❌",
    tag: "Trap",
    estilo:
    "Canal recentemente criado, porém já é condecorado um dos melhores da cena, tendo crescido muito nos últimos meses com sons como Anoitecer Cruel.",
  },
  {
   n: "SlowGm",
    id: "SlowGm",
    foto: "assets/slowgm.jpg",
    descricao: "Olá, meu nome é João Vitor e eu faço música em diferentes estilos. Para mim, a música é como uma das maiores engrenagens do mundo, e saber que o que eu faço pode influenciar a rotina de alguém, tornar essa pessoa mais feliz e intensificar os sentimentos (mesmo que não de uma forma potencialmente impactante para alguns), torna o meu dia mais feliz e me motiva a continuar, encontrando assim um significado dentro de mim por trás de tanto esforço investido em cada composição.<br>Eu geralmente não trabalho muito com vídeos porque isso abala profundamente as raízes da minha criatividade.<br>Isso é um pouco sobre a minha personalidade artística. Obrigado por ler! ✨☕",
    tag: "Pop",
    estilo:
    "Faz musicas com muita inspiração no pop, assim como muitos ele não fala diretamente sobre a obra que está retrantando, apenas passando sentimentos e referências a mesma.",
  },
  {
   n: "Oshaman",
    id: "Oshaman",
    foto: "assets/oshaman.jpg",
    descricao: "o proprio shamas",
    tag: "Pop · MPB",
    estilo:
    "Traz musicas com maior foco em instrumental e uma voz limpa, sempre trazendo consigo um pouco de uma raiz brasileira em suas musicas.",
  },
  {
   n: "Chrono",
    id: "chrono",
    foto: "assets/chrono.jpg",
    descricao: "Chronologicamente avançado!",
    tag: "Hip-Hop · Rap",
    estilo:
    "Traz musicas com grande ênfase na história dos personagens abordados, com raizes bem fortes no rap e hip-hop.",
  },
  {
   n: "HalaCG",
    id: "halacg",
    foto: "assets/halacg.jpg",
    descricao: "Hiii!<p>I'm Hala, a music producer/composer and singer/songwriter who loves some of the nerdiest things around! You can expect plenty of original songs and music inspired by pop culture here, as well as covers and cover remixes, so if you're into that kind of content then it might be worth subscribing to my channel ;P</p><p>Thanks for checking out my Youtube page! :D</p>",
    tag: "Pop · Rock",
    estilo:
    "Faz conteúdo majoritariamente do jogo 'Honkai: Star Rail' chegando até a fazer parceria com a empresa do mesmo, sempre busca trazer uma musica que representa bem o personagem abordado.",
  },
  {
   n: "Novatroop",
    id: "novatroop",
    foto: "assets/novatroop.jpg",
    descricao: "Eu sou o Small, não venha aqui esperando mais do mesmo...",
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

const MAX_RESULTADOS = 8;
let tokenRanking = 0;
let audioAtual = null;
let botaoAtual = null;
let rankingAtual = [];        
let ultimosResultados = [];   
let filaSalvar = Promise.resolve(); 

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

function mesmoArtista(nomeNoItunes, procurado) {
  const limpar = (t) => " " + normalizar(t).replace(/[^a-z0-9]+/g, " ").trim() + " ";
  return limpar(nomeNoItunes).indexOf(limpar(procurado)) !== -1;
}

async function pesquisarMusicas(c, consulta) {
  const nomeArtista = c.nomeItunes || c.n;
  const url =
    "https://itunes.apple.com/search?term=" +
    encodeURIComponent(consulta + " " + nomeArtista) +
    "&media=music&entity=song&country=BR&limit=50";
  const dados = await chamarItunes(url);

  const vistos = new Set();
  const achadas = [];
  (dados.results || []).forEach((r) => {
    if (r.wrapperType !== "track" || r.kind !== "song") return;
    if (!mesmoArtista(r.artistName || "", nomeArtista)) return;
    const chave = normalizar(r.trackName || "");
    if (!chave || vistos.has(chave)) return; // evita versões repetidas
    vistos.add(chave);
    achadas.push({
      id: String(r.trackId),
      titulo: r.trackName,
      album: r.collectionName || "",
      capa: r.artworkUrl100 || "",
      preview: r.previewUrl || "",
      link: r.trackViewUrl || "",
    });
  });
  return achadas.slice(0, MAX_RESULTADOS);
}

function criarBotao(texto, rotulo, desativado, aoClicar, classe) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = texto;
  b.setAttribute("aria-label", rotulo);
  b.disabled = desativado;
  if (classe) b.className = classe;
  b.addEventListener("click", aoClicar);
  return b;
}

function criarNome(m) {
  const nome = document.createElement("span");
  nome.className = "nome-musica";
  nome.textContent = m.titulo;
  if (m.album) {
    const album = document.createElement("small");
    album.className = "album";
    album.textContent = m.album;
    nome.appendChild(album);
  }
  if (m.link) {
    const a = document.createElement("a");
    a.className = "link-apple";
    a.href = m.link;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Apple Music ↗";
    nome.appendChild(a);
  }
  return nome;
}

function criarBotaoPrevia(m) {
  const play = criarBotao("▶", "Ouvir prévia de " + m.titulo, false, () =>
    tocarPrevia(m.preview, play),
  );
  return play;
}

function mostrarPedidoDeLogin(c) {
  sessionStorage.clear();
  const card = document.getElementById("card-ranking");
  if (!card) return;
  card.innerHTML =
    "<h3>Meu ranking de músicas</h3>" +
    "<p>Entre na sua conta para montar o seu ranking de " + c.n + ".</p>" +
    '<div class="acoes">' +
    '<a class="btn btn-sm" href="login.html">Entrar</a> ' +
    '<a class="btn btn-sec btn-sm" href="cadastro.html">Cadastre-se</a></div>';
}

function desenharResultados(c) {
  pararPrevia();
  const ul = document.getElementById("resultados-musica");
  if (!ul) return;
  ul.innerHTML = "";

  ultimosResultados.forEach((m) => {
    const li = document.createElement("li");
    li.className = "item-resultado";
    li.appendChild(criarNome(m));

    const acoes = document.createElement("span");
    acoes.className = "mover";
    if (m.preview) acoes.appendChild(criarBotaoPrevia(m));

    const jaTem = rankingAtual.some((x) => x.id === m.id);
    const add = criarBotao(
      jaTem ? "No ranking ✓" : "+ Adicionar",
      "Adicionar " + m.titulo + " ao ranking",
      jaTem,
      () => adicionarMusica(c, m, add),
      "btn-add",
    );
    acoes.appendChild(add);

    li.appendChild(acoes);
    ul.appendChild(li);
  });
}

async function adicionarMusica(c, m, botao) {
  const status = document.getElementById("status-busca");
  botao.disabled = true;

  const r = await VSide.chamarApi("/ranking/adicionar", {
    method: "POST",
    body: JSON.stringify({ artistaId: c.id, artistaNome: c.n, musica: m }),
  });

  if (r.status === 401) {
    mostrarPedidoDeLogin(c);
    return;
  }
  if (r.ok || r.status === 409) {
    if (!rankingAtual.some((x) => x.id === m.id)) rankingAtual.push(m);
    status.textContent = r.ok
      ? "“" + m.titulo + "” entrou no seu ranking."
      : "Esta música já estava no seu ranking.";
    desenharRanking(c);
    desenharResultados(c);
    return;
  }

  botao.disabled = false;
  status.textContent = r.erro;
}

function desenharRanking(c) {
  pararPrevia();
  const ol = document.getElementById("lista-ranking");
  if (!ol) return [];
  ol.innerHTML = "";
  const refs = [];

  if (rankingAtual.length === 0) {
    ol.innerHTML =
      '<li class="rank-vazio">Seu ranking ainda está vazio. Pesquise uma música acima e adicione.</li>';
    return refs;
  }

  rankingAtual.forEach((m, i) => {
    const li = document.createElement("li");
    li.className = "item-rank";

    const pos = document.createElement("span");
    pos.className = "pos";
    pos.textContent = i + 1;

    const mover = document.createElement("span");
    mover.className = "mover";
    if (m.preview) mover.appendChild(criarBotaoPrevia(m));
    const sobe = criarBotao("▲", "Subir " + m.titulo, i === 0, () => moverMusica(c, i, -1));
    const desce = criarBotao(
      "▼",
      "Descer " + m.titulo,
      i === rankingAtual.length - 1,
      () => moverMusica(c, i, 1),
    );
    const tira = criarBotao("✕", "Remover " + m.titulo + " do ranking", false, () =>
      removerMusica(c, i),
      "remover",
    );
    mover.appendChild(sobe);
    mover.appendChild(desce);
    mover.appendChild(tira);

    li.appendChild(pos);
    li.appendChild(criarNome(m));
    li.appendChild(mover);
    ol.appendChild(li);
    refs.push({ sobe, desce });
  });
  return refs;
}

function moverMusica(c, i, direcao) {
  const j = i + direcao;
  if (j < 0 || j >= rankingAtual.length) return;
  [rankingAtual[i], rankingAtual[j]] = [rankingAtual[j], rankingAtual[i]];
  const refs = desenharRanking(c);

  const alvo = refs[j];
  const preferido = direcao < 0 ? alvo.sobe : alvo.desce;
  const outro = direcao < 0 ? alvo.desce : alvo.sobe;
  (preferido.disabled ? outro : preferido).focus();

  const ordem = rankingAtual.map((m) => m.id);
  filaSalvar = filaSalvar.then(async () => {
    const r = await VSide.chamarApi("/ranking/ordem", {
      method: "POST",
      body: JSON.stringify({ artistaId: c.id, ordem: ordem }),
    });
    if (r.status === 401) {
      mostrarPedidoDeLogin(c);
    } else if (!r.ok) {
      const status = document.getElementById("status-ranking");
      if (status) status.textContent = r.erro;
    }
  });
}

async function removerMusica(c, i) {
  const m = rankingAtual[i];
  const status = document.getElementById("status-ranking");

  const r = await VSide.chamarApi("/ranking/remover", {
    method: "POST",
    body: JSON.stringify({ artistaId: c.id, musicaId: m.id }),
  });

  if (r.status === 401) {
    mostrarPedidoDeLogin(c);
    return;
  }
  if (!r.ok) {
    status.textContent = r.erro;
    return;
  }
  rankingAtual = rankingAtual.filter((x) => x.id !== m.id);
  status.textContent = "“" + m.titulo + "” saiu do seu ranking.";
  desenharRanking(c);
  desenharResultados(c);
}

function ligarBusca(c) {
  const form = document.getElementById("form-busca-musica");
  const campo = document.getElementById("busca-musica");
  const botao = document.getElementById("botao-busca-musica");
  const status = document.getElementById("status-busca");
  campo.setAttribute("aria-label", "Buscar música de " + c.n);

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const texto = campo.value.trim();
    if (!texto) {
      status.textContent = "Digite o nome de uma música.";
      return;
    }

    const meuToken = tokenRanking;
    botao.disabled = true;
    status.textContent = "Buscando no iTunes…";
    ultimosResultados = [];
    desenharResultados(c);

    try {
      ultimosResultados = await pesquisarMusicas(c, texto);
    } catch (e) {
      if (meuToken !== tokenRanking) return;
      botao.disabled = false;
      status.textContent = "Não consegui buscar agora. Tente de novo em instantes.";
      return;
    }
    if (meuToken !== tokenRanking) return; 

    botao.disabled = false;
    status.textContent = ultimosResultados.length
      ? "Escolha as músicas que quer adicionar:"
      : "Nenhuma música de " + c.n + " encontrada para “" + texto + "”. Confira o nome ou tente outro trecho do título.";
    desenharResultados(c);
  });
}

async function iniciarRanking(c) {
  const meuToken = ++tokenRanking;
  const status = document.getElementById("status-ranking");
  rankingAtual = [];
  ultimosResultados = [];
  status.textContent = "Carregando o seu ranking…";

  const r = await VSide.chamarApi("/ranking?artista=" + encodeURIComponent(c.id));
  if (meuToken !== tokenRanking) return; // a pessoa já abriu outra tela

  if (r.status === 401) {
    mostrarPedidoDeLogin(c);
    return;
  }
  if (!r.ok) {
    status.textContent = r.erro;
    return;
  }

  rankingAtual = r.dados.musicas;
  status.textContent = "";
  desenharRanking(c);
  ligarBusca(c);
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
    '<div class="card" id="card-ranking"><h3>Meu ranking de músicas</h3>' +
    '<p class="dica">Pesquise uma música deste cantor e adicione ao seu ranking. Use as setas para mudar a ordem.</p>' +
    '<form class="busca-musica" id="form-busca-musica" novalidate>' +
    '<input type="search" id="busca-musica" placeholder="Nome da música..." autocomplete="off" aria-label="Buscar música">' +
    '<button class="btn btn-sm" type="submit" id="botao-busca-musica">Buscar</button></form>' +
    '<p class="status" id="status-busca"></p>' +
    '<ul class="resultados" id="resultados-musica"></ul>' +
    '<h4 class="titulo-ranking">Seu ranking</h4>' +
    '<p class="status" id="status-ranking"></p>' +
    '<ol class="ranking" id="lista-ranking"></ol></div>' +
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