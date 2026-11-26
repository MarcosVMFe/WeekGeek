var database = require("../database/config");

function listar(usuarioId, artistaId) {
    var instrucaoSql = `
        SELECT id_musica, titulo, album, capa, preview, link
        FROM ranking_musica
        WHERE fk_usuario = ? AND id_artista = ?
        ORDER BY posicao ASC, id ASC;
    `;
    return database.executar(instrucaoSql, [usuarioId, artistaId]);
}

function proximaPosicao(usuarioId, artistaId) {
    var instrucaoSql = `
        SELECT COALESCE(MAX(posicao), 0) + 1 AS proxima
        FROM ranking_musica
        WHERE fk_usuario = ? AND id_artista = ?;
    `;
    return database.executar(instrucaoSql, [usuarioId, artistaId]);
}

function adicionar(usuarioId, artista, musica, posicao, dataHora) {
    var instrucaoSql = `
        INSERT INTO ranking_musica
            (fk_usuario, id_artista, nome_artista, id_musica, titulo, album, capa, preview, link, posicao, dt_adicao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, [
        usuarioId, artista.id, artista.nome,
        musica.id, musica.titulo, musica.album, musica.capa, musica.preview, musica.link,
        posicao, dataHora
    ]);
}

function remover(usuarioId, artistaId, musicaId) {
    var instrucaoSql = `
        DELETE FROM ranking_musica
        WHERE fk_usuario = ? AND id_artista = ? AND id_musica = ?;
    `;
    return database.executar(instrucaoSql, [usuarioId, artistaId, musicaId]);
}

function atualizarPosicao(usuarioId, artistaId, musicaId, posicao) {
    var instrucaoSql = `
        UPDATE ranking_musica SET posicao = ?
        WHERE fk_usuario = ? AND id_artista = ? AND id_musica = ?;
    `;
    return database.executar(instrucaoSql, [posicao, usuarioId, artistaId, musicaId]);
}

function adicionadasDesde(usuarioId, desde) {
    var instrucaoSql = `
        SELECT id_artista, nome_artista, id_musica, titulo, dt_adicao
        FROM ranking_musica
        WHERE fk_usuario = ? AND dt_adicao >= ?
        ORDER BY dt_adicao DESC, id DESC;
    `;
    return database.executar(instrucaoSql, [usuarioId, desde]);
}

function contarTudo(usuarioId) {
    var instrucaoSql = "SELECT COUNT(*) AS total FROM ranking_musica WHERE fk_usuario = ?;";
    return database.executar(instrucaoSql, [usuarioId]);
}

module.exports = {
    listar,
    proximaPosicao,
    adicionar,
    remover,
    atualizarPosicao,
    adicionadasDesde,
    contarTudo
};