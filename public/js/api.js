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
                return { ok: false, status: resposta.status, erro: (dados && dados.erro) || 'Algo deu errado. Tente de novo.' };
            }
            return { ok: true, status: resposta.status, dados: dados };
        } catch (e) {
            return { ok: false, status: 0, erro: 'Não foi possível falar com o servidor. Verifique sua conexão.' };
        }
    }

    window.VSide = Object.assign(window.VSide || {}, { chamarApi: chamarApi });
})();