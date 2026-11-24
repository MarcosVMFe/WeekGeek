
var artistas = [
    "Novatroop", " Chrono Rapper", "M4rkim", "Anny", "HalaCG",
    "Blxck", "Anirap", "7 Minutoz", "MHRAP", "oShaman", "Slow GM",
    "Enygma Rapper"
]

var cachePorArtista = {};

function normalizar(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function limparTitulo(titulo) {
    return normalizar(titulo)
        .replace(/\(.*?\)|\[.*?\]/g, " ")   
        .replace(/\s-\s.*$/, " ")           
        .replace(/['’`]/g, "")              
        .replace(/[^a-z0-9 ]/g, " ")        
        .replace(/\s+/g, " ")
        .trim();
}

function distancia(a, b) {
    var anterior = [];
    for (var j = 0; j <= b.length; j++) anterior[j] = j;

    for (var i = 1; i <= a.length; i++) {
        var atual = [i];
        for (var k = 1; k <= b.length; k++) {
            var custo = a[i - 1] === b[k - 1] ? 0 : 1;
            atual[k] = Math.min(
                anterior[k] + 1,        // apagar
                atual[k - 1] + 1,       // inserir
                anterior[k - 1] + custo // trocar
            );
        }
        anterior = atual;
    }
    return anterior[b.length];
}

function acertou(resposta, titulo) {
    var r = limparTitulo(resposta);
    var t = limparTitulo(titulo);
    if (t === "") t = normalizar(titulo).replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim(); // "(Intro)" -> "intro"
    if (r === "" || t === "") return false;

    var tolerancia = t.length <= 5 ? 0 : (t.length <= 12 ? 1 : 2);
    return distancia(r, t) <= tolerancia;
}

function mesmoArtista(nomeNoItunes, chave) {
    var nome = " " + normalizar(nomeNoItunes).replace(/[^a-z0-9]+/g, " ").trim() + " ";
    var procurado = " " + chave.replace(/[^a-z0-9]+/g, " ").trim() + " ";
    return nome.indexOf(procurado) !== -1;
}


async function buscarFaixas(artista) {
    artista = String(artista).trim();          
    var chave = normalizar(artista);
    if (cachePorArtista[chave]) return cachePorArtista[chave];

    var url = "https://itunes.apple.com/search"
        + "?term=" + encodeURIComponent(artista)
        + "&media=music&entity=song&attribute=artistTerm&country=BR&limit=50";

    var resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error("iTunes respondeu com status " + resposta.status);
    }

    var dados = await resposta.json();

    var vistos = {};
    var faixas = [];

    dados.results.forEach(function (f) {
        if (!f.previewUrl) return;                                    
        if (!mesmoArtista(f.artistName, chave)) return;               
        if (/karaok|tribute|instrumental|\bcover\b/.test(normalizar(f.trackName + " " + f.collectionName))) return;

        var nome = limparTitulo(f.trackName);
        if (vistos[nome]) return;
        vistos[nome] = true;

        faixas.push({
            titulo: f.trackName,
            artista: f.artistName,
            album: f.collectionName,
            capa: f.artworkUrl100 ? f.artworkUrl100.replace("100x100", "600x600") : null,
            preview: f.previewUrl
        });
    });

    if (faixas.length > 0) cachePorArtista[chave] = faixas;
    return faixas;
}

async function sortearMusica() {
    for (var tentativa = 0; tentativa < 5; tentativa++) {
        var artista = artistas[Math.floor(Math.random() * artistas.length)];
        var faixas = await buscarFaixas(artista);

        if (faixas.length > 0) {
            return faixas[Math.floor(Math.random() * faixas.length)];
        }
    }
    throw new Error("Nenhuma música encontrada");
}

module.exports = { sortearMusica, acertou };