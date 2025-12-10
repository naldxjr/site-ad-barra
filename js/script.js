/* SCRIPT DOUTOR EM PROGRAMAÇÃO
   Versão: Final e Corrigida (Sem erro de Touchstart)
*/

// 1. Versículos do Dia
const versiculos = [
    { texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", ref: "João 3:16" },
    { texto: "O Senhor é o meu pastor, nada me faltará.", ref: "Salmos 23:1" },
    { texto: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13" },
    { texto: "Mil cairão ao teu lado, e dez mil à tua direita, mas não chegarás a ti.", ref: "Salmos 91:7" },
    { texto: "Buscai primeiro o Reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.", ref: "Mateus 6:33" },
    { texto: "Porque sou eu que conheço os planos que tenho para vocês', diz o Senhor, 'planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.", ref: "Jeremias 29:11" }
];

function carregarVersiculo() {
    const elTexto = document.getElementById("versiculo-texto");
    const elRef = document.getElementById("versiculo-ref");
    
    // Só roda se os elementos existirem na página (evita erro nas páginas internas)
    if (elTexto && elRef) {
        const indice = Math.floor(Math.random() * versiculos.length);
        const versiculoEscolhido = versiculos[indice];
        elTexto.innerText = `"${versiculoEscolhido.texto}"`;
        elRef.innerText = versiculoEscolhido.ref;
    }
}

// 2. Menu Mobile (SIMPLIFICADO)
const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    // Removemos a linha que causava o erro (event.preventDefault no touch)
    
    const nav = document.getElementById('nav-principal');
    nav.classList.toggle('active'); // Abre ou fecha o menu
    
    // Acessibilidade (Boas práticas)
    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    
    if (active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    }
}

// Verifica se o botão existe antes de adicionar o evento
if (btnMobile) {
    // Usamos apenas 'click'. Ele funciona no celular e no PC sem dar erro.
    btnMobile.addEventListener('click', toggleMenu);
}

// Iniciar funções ao carregar a página
window.onload = carregarVersiculo;