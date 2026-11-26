(function () {
    'use strict';

    const el = {
        carregando: document.getElementById('estado-carregando'),
        login: document.getElementById('estado-login'),
        erro: document.getElementById('estado-erro'),
        textoErro: document.getElementById('texto-erro'),
        vazio: document.getElementById('estado-vazio'),
        conteudo: document.getElementById('conteudo-dash'),
        kpiTotal: document.getElementById('kpiTotal'),
        kpiPeriodo: document.getElementById('kpiPeriodo'),
        kpiArtista: document.getElementById('kpiArtista'),
        kpiArtistaTotal: document.getElementById('kpiArtistaTotal'),
        kpiDia: document.getElementById('kpiDia'),
        kpiDiaTotal: document.getElementById('kpiDiaTotal'),
        kpiRanking: document.getElementById('kpiRanking'),
        graficoDias: document.getElementById('graficoDias'),
        graficoArtistas: document.getElementById('graficoArtistas'),
        avisoGrafico: document.getElementById('avisoGrafico'),
        recentes: document.getElementById('listaRecentes')
    };

    const COR = { texto: '#c9a78f', linha: '#4a2616', fundo: '#22110a', laranja: '#ff6a1a', dourado: '#ffb703' };
    const PALETA = ['#ff6a1a', '#ffb703', '#d62828', '#ff9a3c', '#c9a78f', '#e85d04', '#ffd166', '#8f2d0e'];

    function mostrar(estado) {
        ['carregando', 'login', 'erro', 'vazio', 'conteudo'].forEach(function (nome) {
            el[nome].hidden = nome !== estado;
        });
    }

    function rotuloDia(dataIso) {
        const p = dataIso.split('-').map(Number);
        return new Date(p[0], p[1] - 1, p[2])
            .toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
            .replace('.', '');
    }

    function diaMes(dataIso) {
        const p = dataIso.split('-');
        return p[2] + '/' + p[1];
    }

    function quando(texto) {
        return diaMes(texto.slice(0, 10)) + ' às ' + texto.slice(11, 16);
    }

    function plural(n, singular, pluralTxt) {
        return n + ' ' + (n === 1 ? singular : pluralTxt);
    }


    function preencherNumeros(d) {
        el.kpiTotal.textContent = d.total;
        el.kpiPeriodo.textContent = diaMes(d.periodo.de) + ' a ' + diaMes(d.periodo.ate);
        el.kpiRanking.textContent = d.totalRanking;

        const topArtista = d.porArtista[0]; 
        el.kpiArtista.textContent = topArtista ? topArtista.nome : '–';
        el.kpiArtistaTotal.textContent = topArtista ? plural(topArtista.total, 'música', 'músicas') : '';

        let melhorDia = null;
        d.porDia.forEach(function (dia) {
            if (!melhorDia || dia.total > melhorDia.total) melhorDia = dia;
        });
        el.kpiDia.textContent = melhorDia ? rotuloDia(melhorDia.data) : '–';
        el.kpiDiaTotal.textContent = melhorDia ? plural(melhorDia.total, 'música', 'músicas') : '';
    }


    function desenharGraficos(d) {
        if (typeof Chart === 'undefined') {
            el.avisoGrafico.hidden = false;
            return;
        }

        Chart.defaults.color = COR.texto;
        Chart.defaults.borderColor = COR.linha;
        Chart.defaults.font.family = 'Georgia, "Times New Roman", serif';

        new Chart(el.graficoDias, {
            type: 'bar',
            data: {
                labels: d.porDia.map(function (dia) { return rotuloDia(dia.data); }),
                datasets: [{
                    label: 'Músicas adicionadas',
                    data: d.porDia.map(function (dia) { return dia.total; }),
                    backgroundColor: 'rgba(255, 106, 26, 0.85)',
                    borderColor: COR.dourado,
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, ticks: { precision: 0 } }   // só números inteiros
                }
            }
        });

        new Chart(el.graficoArtistas, {
            type: 'doughnut',
            data: {
                labels: d.porArtista.map(function (a) { return a.nome; }),
                datasets: [{
                    data: d.porArtista.map(function (a) { return a.total; }),
                    backgroundColor: d.porArtista.map(function (a, i) { return PALETA[i % PALETA.length]; }),
                    borderColor: COR.fundo,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '58%',
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }


    function preencherRecentes(d) {
        el.recentes.innerHTML = '';
        d.recentes.forEach(function (m) {
            const li = document.createElement('li');

            const texto = document.createElement('span');
            texto.className = 'musica';
            texto.textContent = m.titulo;                 
            const artista = document.createElement('span');
            artista.className = 'artista';
            artista.textContent = m.artista;
            texto.appendChild(artista);

            const data = document.createElement('span');
            data.className = 'quando';
            data.textContent = quando(m.quando);

            li.appendChild(texto);
            li.appendChild(data);
            el.recentes.appendChild(li);
        });
    }


    async function carregar() {
        const r = await window.VSide.chamarApi('/dashboard/semana');

        if (r.status === 401) {
            sessionStorage.clear();      
            mostrar('login');
            return;
        }
        if (!r.ok) {
            el.textoErro.textContent = r.erro;
            mostrar('erro');
            return;
        }

        const d = r.dados;
        if (d.total === 0) {
            mostrar('vazio');
            return;
        }

        mostrar('conteudo');
        preencherNumeros(d);
        desenharGraficos(d);
        preencherRecentes(d);
    }

    carregar();
})();
