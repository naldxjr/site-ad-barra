// --- 1. SISTEMA DE TOASTS (NOTIFICAÇÕES) ---
function showToast(mensagem, tipo = 'info') {
    // Cria o container se não existir
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Ícones baseados no tipo
    let icone = 'fa-info-circle';
    if (tipo === 'sucesso') icone = 'fa-check-circle';
    if (tipo === 'erro') icone = 'fa-exclamation-triangle';

    // Cria o elemento do toast
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `
        <i class="fa-solid ${icone}"></i>
        <span class="toast-msg">${mensagem}</span>
    `;

    // Adiciona na tela
    container.appendChild(toast);

    // Remove do HTML depois de 3 segundos (tempo da animação + um pouco)
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- 2. MENU MOBILE ---
const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    const nav = document.getElementById('nav-principal');
    nav.classList.toggle('active');

    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);

    if (active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    }
}

if (btnMobile) {
    btnMobile.addEventListener('click', toggleMenu);
}

// --- 3. COPIAR PIX (Página Contribua) ---
const btnCopiarPix = document.getElementById('btn-copiar-pix');
const textoPix = document.getElementById('chave-pix-texto');

if (btnCopiarPix && textoPix) {
    btnCopiarPix.addEventListener('click', () => {
        // Pega o texto da chave
        const texto = textoPix.innerText;

        // Copia para a área de transferência
        navigator.clipboard.writeText(texto).then(() => {
            showToast('Chave PIX copiada!', 'sucesso');
        }).catch(() => {
            showToast('Erro ao copiar. Tente manualmente.', 'erro');
        });
    });
}

// --- 4. FORMULÁRIO COM AJAX (Página Contato) ---
// Impede que a página recarregue ao enviar o form
const formContato = document.getElementById('form-contato');

if (formContato) {
    formContato.addEventListener('submit', async function (event) {
        event.preventDefault(); // Para o envio padrão
        const botao = formContato.querySelector('button');
        const textoOriginal = botao.innerText;

        // Feedback visual de carregando
        botao.innerText = 'Enviando...';
        botao.disabled = true;
        botao.style.opacity = '0.7';

        const data = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: formContato.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showToast('Mensagem enviada com sucesso!', 'sucesso');
                formContato.reset(); // Limpa os campos
            } else {
                showToast('Ocorreu um erro. Tente novamente.', 'erro');
            }
        } catch (error) {
            showToast('Erro de conexão.', 'erro');
        } finally {
            // Volta o botão ao normal
            botao.innerText = textoOriginal;
            botao.disabled = false;
            botao.style.opacity = '1';
        }
    });
}

// --- 5. MARCAR MENU ATIVO (Qual página estou?) ---
// Pega o nome do arquivo atual (ex: contato.html)
const paginaAtual = window.location.pathname.split("/").pop();
const linksMenu = document.querySelectorAll('.menu-lista a');

linksMenu.forEach(link => {
    // Se o href do link for igual a pagina atual
    if (link.getAttribute('href') === paginaAtual) {
        link.style.color = 'var(--cor-ouro)'; // Pinta de dourado
    }
});

// --- 6. VERSÍCULO DO DIA ---
const versiculos = [
    { texto: "Porque Deus amou o mundo de tal maneira...", ref: "João 3:16" },
    { texto: "O Senhor é o meu pastor, nada me faltará.", ref: "Salmos 23:1" },
    { texto: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13" },
    { texto: "Mil cairão ao teu lado, e dez mil à tua direita.", ref: "Salmos 91:7" }
];

function carregarVersiculo() {
    const elTexto = document.getElementById("versiculo-texto");
    const elRef = document.getElementById("versiculo-ref");

    if (elTexto && elRef) {
        const indice = Math.floor(Math.random() * versiculos.length);
        const el = versiculos[indice];
        elTexto.innerText = `"${el.texto}"`;
        elRef.innerText = el.ref;
    }
}

/* --- SISTEMA DE ATUALIZAÇÃO (CARTAZ + VÍDEO) --- */
document.addEventListener('DOMContentLoaded', function() {
    
    // Verifica se o arquivo de dados foi carregado corretamente
    if (typeof atualizacaoSemanal !== 'undefined') {

        // 1. Atualiza o Cartaz do Hero
        const imgCartaz = document.getElementById('img-cartaz');
        if (imgCartaz) {
            imgCartaz.src = atualizacaoSemanal.cartazHero;
        }

        // 2. Atualiza o Título do Vídeo
        const vidTitulo = document.getElementById('video-titulo');
        if (vidTitulo) {
            vidTitulo.innerText = atualizacaoSemanal.tituloVideo;
        }

        // 3. Atualiza a Descrição do Vídeo
        const vidDesc = document.getElementById('video-descricao');
        if (vidDesc) {
            vidDesc.innerText = atualizacaoSemanal.descricaoVideo;
        }

        // 4. Atualiza o Link do YouTube
        const vidIframe = document.getElementById('video-iframe');
        if (vidIframe) {
            vidIframe.src = atualizacaoSemanal.linkYoutube;
        }
    }
});

window.onload = carregarVersiculo;