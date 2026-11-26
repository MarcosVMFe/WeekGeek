(function () {
    'use strict';

    const nome = sessionStorage.NOME_USUARIO;
    const links = document.querySelectorAll('header.top nav a.nav-conta');
    if (!nome || links.length < 2) return;

    const painel = links[0];
    const sair = links[1];

    painel.textContent = 'Dashboard';
    painel.href = 'dashboard.html';
    if (location.pathname.endsWith('dashboard.html')) {
        painel.setAttribute('aria-current', 'page');
    } else {
        painel.removeAttribute('aria-current');
    }

    sair.textContent = 'Sair';
    sair.href = '#';
    sair.title = 'Sair da conta de ' + nome;
    sair.removeAttribute('aria-current');

    sair.addEventListener('click', async function (evento) {
        evento.preventDefault();
        if (window.VSide) {
            await window.VSide.chamarApi('/usuarios/sair', { method: 'POST' });
        }
        sessionStorage.clear();
        window.location = 'index.html';
    });
})();