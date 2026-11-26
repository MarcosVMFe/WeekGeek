var rankingModel = require("../models/rankingModel");
var datas = require("../utils/datas");

var MAX_POR_ARTISTA = 50;                    
var ID_ARTISTA = /^[A-Za-z0-9_-]{1,50}$/;   
var ID_MUSICA = /^[A-Za-z0-9_.:-]{1,30}$/;  

function cortar(valor, max) {
    return typeof valor == "string" ? valor.trim().slice(0, max) : "";
}

function urlSegura(valor, max) {
    var v = typeof valor == "string" ? valor.trim() : "";
    return v.length <= max && /^https?:\/\//i.test(v) ? v : "";
}

function erroInterno(res, erro, mensagem) {
    console.log("\n" + mensagem + " Erro: ", erro.sqlMessage || erro);
    res.status(500).json({ erro: mensagem });
}

function salvarOrdem(usuarioId, artistaId, ids) {
    return ids.reduce(function (cadeia, idMusica, i) {
        return cadeia.then(function () {
            return rankingModel.atualizarPosicao(usuarioId, artistaId, idMusica, i + 1);
        });
    }, Promise.resolve());
}

function listar(req, res) {
    var artistaId = req.query.artista;
    if (!ID_ARTISTA.test(artistaId || "")) {
        return res.status(400).json({ erro: "Cantor inválido." });
    }

    rankingModel.listar(req.session.usuarioId, artistaId)
        .then(function (linhas) {
            res.json({
                musicas: linhas.map(function (l) {
                    return { id: l.id_musica, titulo: l.titulo, album: l.album, capa: l.capa, preview: l.preview, link: l.link };
                })
            });
        })
        .catch(function (erro) { erroInterno(res, erro, "Não foi possível carregar o ranking."); });
}

function adicionar(req, res) {
    var corpo = req.body || {};
    var m = corpo.musica || {};
    var usuarioId = req.session.usuarioId;

    var artista = { id: corpo.artistaId, nome: cortar(corpo.artistaNome, 100) };
    var musica = {
        id: typeof m.id == "string" || typeof m.id == "number" ? String(m.id) : "",
        titulo: cortar(m.titulo, 200),
        album: cortar(m.album, 200),
        capa: urlSegura(m.capa, 300),
        preview: urlSegura(m.preview, 400),
        link: urlSegura(m.link, 400)
    };

    if (!ID_ARTISTA.test(artista.id || "") || artista.nome == "") {
        return res.status(400).json({ erro: "Cantor inválido." });
    }
    if (!ID_MUSICA.test(musica.id) || musica.titulo == "") {
        return res.status(400).json({ erro: "Música inválida." });
    }

    rankingModel.listar(usuarioId, artista.id)
        .then(function (atuais) {
            if (atuais.length >= MAX_POR_ARTISTA) {
                res.status(400).json({ erro: "Seu ranking deste cantor já tem " + MAX_POR_ARTISTA + " músicas." });
                return;
            }

            return rankingModel.proximaPosicao(usuarioId, artista.id)
                .then(function (r) {
                    return rankingModel.adicionar(usuarioId, artista, musica, Number(r[0].proxima), datas.dataHora(new Date()));
                })
                .then(function () {
                    res.json({ ok: true });
                });
        })
        .catch(function (erro) {
            if (erro.code == "ER_DUP_ENTRY") {
                res.status(409).json({ erro: "Esta música já está no seu ranking." });
            } else {
                erroInterno(res, erro, "Não foi possível adicionar a música.");
            }
        });
}

function remover(req, res) {
    var corpo = req.body || {};
    var usuarioId = req.session.usuarioId;
    var artistaId = corpo.artistaId;
    var musicaId = String(corpo.musicaId || "");

    if (!ID_ARTISTA.test(artistaId || "") || !ID_MUSICA.test(musicaId)) {
        return res.status(400).json({ erro: "Dados inválidos." });
    }

    rankingModel.remover(usuarioId, artistaId, musicaId)
        .then(function () {
            return rankingModel.listar(usuarioId, artistaId);
        })
        .then(function (linhas) {
            return salvarOrdem(usuarioId, artistaId, linhas.map(function (l) { return l.id_musica; }));
        })
        .then(function () { res.json({ ok: true }); })
        .catch(function (erro) { erroInterno(res, erro, "Não foi possível remover a música."); });
}

function ordem(req, res) {
    var corpo = req.body || {};
    var usuarioId = req.session.usuarioId;
    var artistaId = corpo.artistaId;
    var nova = corpo.ordem;

    if (!ID_ARTISTA.test(artistaId || "") || !Array.isArray(nova) || nova.length > MAX_POR_ARTISTA) {
        return res.status(400).json({ erro: "Dados inválidos." });
    }
    nova = nova.map(String);

    rankingModel.listar(usuarioId, artistaId)
        .then(function (atuais) {
            var idsAtuais = atuais.map(function (l) { return l.id_musica; });
            var mesmasMusicas = idsAtuais.length == nova.length
                && new Set(nova).size == nova.length
                && nova.every(function (id) { return idsAtuais.indexOf(id) != -1; });

            if (!mesmasMusicas) {
                res.status(400).json({ erro: "A lista enviada não bate com o seu ranking. Recarregue a página." });
                return;
            }

            return salvarOrdem(usuarioId, artistaId, nova).then(function () { res.json({ ok: true }); });
        })
        .catch(function (erro) { erroInterno(res, erro, "Não foi possível salvar a ordem."); });
}

module.exports = {
    listar,
    adicionar,
    remover,
    ordem
};