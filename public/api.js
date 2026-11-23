/* =========================================
   RAP GEEK | api.js
   Função que o jogo usa para falar com o servidor (rotas /jogo/...).
   Devolve sempre { ok, dados, erro }; nunca lança exceção.
   Se você já tem o js/global.js do V-Side com a VSide.chamarApi, pode usar ele no lugar.
========================================= */

(function () {
    'use strict';

    async function chamarApi(url, opcoes) {
        try {
            const resposta = await fetch(url, Object.assign({
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' }
            }, opcoes || {}));

            let dados = null;
            try {
                dados = await resposta.json();
            } catch (e) { /* resposta sem corpo JSON */ }

            if (!resposta.ok) {
                return { ok: false, erro: (dados && dados.erro) || 'Algo deu errado. Tente de novo.' };
            }
            return { ok: true, dados: dados };
        } catch (e) {
            return { ok: false, erro: 'Não foi possível falar com o servidor. Verifique sua conexão.' };
        }
    }

    window.VSide = Object.assign(window.VSide || {}, { chamarApi: chamarApi });
})();