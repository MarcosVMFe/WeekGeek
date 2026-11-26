var rankingModel = require("../models/rankingModel");
var datas = require("../utils/datas");

var DIAS = 7; 

function semana(req, res) {
    var usuarioId = req.session.usuarioId;

    var hoje = new Date();
    var dias = [];
    for (var i = DIAS - 1; i >= 0; i--) {
        dias.push(datas.soData(new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - i)));
    }
    var desde = dias[0] + " 00:00:00";

    Promise.all([
        rankingModel.adicionadasDesde(usuarioId, desde),
        rankingModel.contarTudo(usuarioId)
    ])
        .then(function (resultados) {
            var linhas = resultados[0];

            var porDia = dias.map(function (dia) {
                return {
                    data: dia,
                    total: linhas.filter(function (l) { return datas.soData(l.dt_adicao) == dia; }).length
                };
            });

            var contagem = {};
            linhas.forEach(function (l) {
                contagem[l.nome_artista] = (contagem[l.nome_artista] || 0) + 1;
            });
            var porArtista = Object.keys(contagem)
                .map(function (nome) { return { nome: nome, total: contagem[nome] }; })
                .sort(function (a, b) { return b.total - a.total; });

            res.json({
                periodo: { de: dias[0], ate: dias[DIAS - 1] },
                total: linhas.length,
                totalRanking: Number(resultados[1][0].total),
                porDia: porDia,
                porArtista: porArtista,
                recentes: linhas.slice(0, 8).map(function (l) {
                    return { titulo: l.titulo, artista: l.nome_artista, quando: String(l.dt_adicao).slice(0, 16) };
                })
            });
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao montar o dashboard! Erro: ", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Não foi possível carregar o dashboard." });
        });
}

module.exports = {
    semana
};