const botao = document.getElementById("btn-pedido");
const input = document.getElementById("pedido");
const terminal = document.getElementById("terminal-body");

// Impede erros caso o script seja carregado em uma página sem o terminal.
if (!botao || !input || !terminal) {
    console.error("Alfred Terminal: elementos do terminal não foram encontrados.");
} else {

    // ==========================================
    // COMANDOS E RESPOSTAS DO ALFRED
    // ==========================================

    const respostas = {
        "batmóvel": "Preparando o Batmóvel, senhor.",
        "batmovel": "Preparando o Batmóvel, senhor.",

        "chá": "Servindo chá para o senhor.",
        "cha": "Servindo chá para o senhor.",

        "status": "Todos os sistemas estão operacionais.",
        "sistema": "Todos os sistemas da Batcaverna estão operacionais.",

        "câmeras": "As câmeras estão funcionando normalmente.",
        "cameras": "As câmeras estão funcionando normalmente.",

        "luzes": "Iluminação da Batcaverna ajustada.",
        "luz": "Iluminação da Batcaverna ajustada.",

        "portão": "O portão está sob controle.",
        "portao": "O portão está sob controle.",

        "bom dia": "Bom dia, senhor Wayne.",
        "boa noite": "Boa noite, senhor Wayne.",

        "obrigado": "Sempre às ordens, senhor.",
        "obrigada": "Sempre às ordens, senhor.",

        "gordon": "O Comissário Gordon está a caminho, senhor.",
        "comissário": "O Comissário Gordon está a caminho, senhor.",
        "comissario": "O Comissário Gordon está a caminho, senhor.",

        "alfred": "Estou aqui, senhor.",

        "robin": "O Robin está pronto para ação, senhor.",
        "damian": "O Robin está pronto para ação, senhor.",

        "dick": "O Grayson está pronto para ação, senhor.",
        "asa noturna": "O Grayson está pronto para ação, senhor.",

        "batgirl": "A Batgirl está pronta para ação, senhor.",

        "jason": "O Jason não está mais ativo, senhor.",

        "liga": "A Liga da Justiça está a caminho, senhor.",
        "liga da justiça": "A Liga da Justiça está a caminho, senhor.",
        "liga da justica": "A Liga da Justiça está a caminho, senhor.",

        "vilões": "Quais dos vilões você gostaria de saber? O Coringa, o Pinguim, a Mulher-Gato, o Charada, o Duas-Caras, o Espantalho, o Bane ou o Exterminador.",
        "viles": "Quais dos vilões você gostaria de saber? O Coringa, o Pinguim, a Mulher-Gato, o Charada, o Duas-Caras, o Espantalho, o Bane ou o Exterminador.",

        "coringa": "Aqui estão os arquivos de Coringa, senhor.",
        "joker": "Aqui estão os arquivos de Coringa, senhor.",

        "pinguim": "Aqui estão os arquivos de Oswald Cobblepot, senhor.",
        "cobblepot": "Aqui estão os arquivos de Oswald Cobblepot, senhor.",

        "mulher gato": "Aqui estão os arquivos de Selina Kyle, senhor.",
        "mulher-gato": "Aqui estão os arquivos de Selina Kyle, senhor.",
        "selina": "Aqui estão os arquivos de Selina Kyle, senhor.",

        "charada": "Aqui estão os arquivos de Edward Nigma, senhor.",
        "nigma": "Aqui estão os arquivos de Edward Nigma, senhor.",
        "edward nigma": "Aqui estão os arquivos de Edward Nigma, senhor.",

        "duas caras": "Aqui estão os arquivos de Harvey Dent, senhor.",
        "duas-caras": "Aqui estão os arquivos de Harvey Dent, senhor.",
        "dent": "Aqui estão os arquivos de Harvey Dent, senhor.",

        "espantalho": "Aqui estão os arquivos de Jonathan Crane, senhor.",
        "crane": "Aqui estão os arquivos de Jonathan Crane, senhor.",

        "bane": "Aqui estão os arquivos de Bane, senhor.",

        "exterminador": "Aqui estão os arquivos de Slade Wilson, senhor.",
        "slade": "Aqui estão os arquivos de Slade Wilson, senhor.",

        "ajuda": "Comandos disponíveis: Batmóvel, chá, status, câmeras, luzes, portão, Gordon, Robin, Batgirl, vilões, Coringa, Pinguim, Mulher-Gato, Charada, Duas-Caras, Espantalho, Bane e Exterminador."
    };

    // ==========================================
    // IMAGENS
    // ==========================================

    const imagens = {
        "coringa": "img/coringa.jpg",
        "joker": "img/coringa.jpg",

        "pinguim": "img/pingu.jpg",
        "cobblepot": "img/pingu.jpg",

        "mulher gato": "img/gato.jpg",
        "mulher-gato": "img/gato.jpg",
        "selina": "img/gato.jpg",

        "charada": "img/nigma.jpg",
        "nigma": "img/nigma.jpg",
        "edward nigma": "img/nigma.jpg",

        "espantalho": "img/palha.jpg",
        "crane": "img/palha.jpg",

        "bane": "img/bane.jpg",

        "exterminador": "img/slade.jpg",
        "slade": "img/slade.jpg",

        "duas caras": "img/caras.jpg",
        "duas-caras": "img/caras.jpg",
        "dent": "img/caras.jpg"
    };

    // ==========================================
    // NORMALIZAR TEXTO
    // ==========================================

    function normalizarTexto(texto) {
        return texto
            .toString()
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // ==========================================
    // MOSTRAR IMAGEM
    // ==========================================

    function mostrarImagem(url, nome) {
        const imagem = document.createElement("img");

        imagem.src = url;
        imagem.alt = "Imagem de " + nome;
        imagem.className = "imagem-alfred";

        imagem.onerror = function () {
            console.warn("Alfred Terminal: imagem não encontrada:", url);
            imagem.remove();
        };

        terminal.appendChild(imagem);
    }

    // ==========================================
    // PROCURAR CHAVE NORMALIZADA
    // ==========================================

    function encontrarChave(objeto, texto) {
        const textoNormalizado = normalizarTexto(texto);

        return Object.keys(objeto).find(chave =>
            normalizarTexto(chave) === textoNormalizado
        );
    }

    // ==========================================
    // CONSULTAR IA
    // ==========================================

    async function perguntarParaIA(pergunta) {
        try {
            const resposta = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mensagem: pergunta })
            });

            if (!resposta.ok) {
                throw new Error(`Servidor respondeu com ${resposta.status}`);
            }

            const dados = await resposta.json();

            return dados.resposta || dados.message || dados.content || "Não consegui obter uma resposta, senhor.";
        } catch (erro) {
            console.error("Erro ao consultar a IA:", erro);
            return "Não consegui acessar o sistema de inteligência artificial no momento, senhor.";
        }
    }

    // ==========================================
    // ENVIAR PEDIDO
    // ==========================================

    async function enviarPedido() {
        const pedido = input.value.trim();

        if (!pedido) {
            return;
        }

        // Mostra o comando do usuário.
        const comando = document.createElement("div");
        comando.className = "mensagem-usuario";
        comando.textContent = "BATCAVERNA@WAYNE: " + pedido;
        terminal.appendChild(comando);

        input.value = "";
        input.disabled = true;
        botao.disabled = true;

        // Cria uma mensagem temporária do Alfred.
        const resposta = document.createElement("div");
        resposta.className = "mensagem-alfred";
        resposta.textContent = "Alfred: Processando, senhor...";
        terminal.appendChild(resposta);

        const chave = encontrarChave(respostas, pedido);
        const imagemChave = encontrarChave(imagens, pedido);

        try {
            if (chave) {
                resposta.textContent = "Alfred: " + respostas[chave];
            } else {
                resposta.textContent = "Alfred: " + await perguntarParaIA(pedido);
            }

            if (imagemChave) {
                mostrarImagem(imagens[imagemChave], imagemChave);
            }
        } catch (erro) {
            console.error("Erro ao processar pedido:", erro);
            resposta.textContent = "Alfred: Ocorreu um erro ao processar seu pedido, senhor.";
        } finally {
            input.disabled = false;
            botao.disabled = false;
            input.focus();

            // Rola o terminal para baixo.
            terminal.scrollTop = terminal.scrollHeight;
        }
    }

    // ==========================================
    // BOTÃO ENTER
    // ==========================================

    botao.addEventListener("click", enviarPedido);

    // ==========================================
    // TECLA ENTER
    // ==========================================

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            enviarPedido();
        }
    });

    // ==========================================
    // FOCA NO CAMPO DE TEXTO
    // ==========================================

    input.focus();
}
