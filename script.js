const botao = document.getElementById("btn-pedido");
const input = document.getElementById("pedido");
const terminal = document.getElementById("terminal-body");


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

    "alfred": "Estou aqui, senhor.",

    "robin": "O Robin está pronto para ação, senhor.",
    "damian": "O Robin está pronto para ação, senhor.",

    "dick": "O Grayson está pronto para ação, senhor.",
    "asa noturna": "O Grayson está pronto para ação, senhor.",

    "batgirl": "A Batgirl está pronta para ação, senhor.",

    "jason": "O Jason não está mais ativo, senhor.",

    "liga": "A Liga da Justiça está a caminho, senhor.",
    "liga da justiça": "A Liga da Justiça está a caminho, senhor.",


    // ==========================================
    // VILÕES
    // ==========================================

    "vilões":
        "Quais dos vilões você gostaria de saber? O Coringa, o Pinguim, a Mulher-Gato, o Charada, o Duas-Caras, o Espantalho, o Bane ou o Exterminador.",

    "coringa":
        `O Coringa
Nome: Desconhecido
Ocupação: Criminoso
Habilidades: Inteligência criminosa, manipulação, química e engenharia.

Sobre: O Coringa é um dos maiores criminosos de Gotham.
"Por que está tão sério?"`,

    "pinguim":
        `O Pinguim
Nome: Oswald Cobblepot
Ocupação: Criminoso
Habilidades: Inteligência, liderança e conhecimento em aves.

Sobre: O Pinguim é um dos maiores criminosos de Gotham.`,

    "mulher-gato":
        `Mulher-Gato
Nome: Selina Kyle
Ocupação: Ladrã
Habilidades: Furtividade, acrobacias e combate.

Sobre: Mulher-Gato é uma anti-heroína e às vezes vilã.`,

    "charada":
        `O Charada
Nome: Edward Nigma
Ocupação: Criminoso
Habilidades: Inteligência, enigmas e quebra-cabeças.

Sobre: O Charada é obcecado por provar que é mais inteligente que os outros.`,

    "duas-caras":
        `O Duas-Caras
Nome: Harvey Dent
Ocupação: Criminoso
Habilidades: Manipulação e combate.

Sobre: O Duas-Caras toma suas decisões com base no lançamento de uma moeda.`,

    "espantalho":
        `O Espantalho
Nome: Jonathan Crane
Ocupação: Criminoso
Habilidades: Uso de toxinas do medo.

Sobre: O Espantalho utiliza toxinas para provocar medo.`,

    "bane":
        `O Bane
Nome: Desconhecido
Ocupação: Criminoso
Habilidades: Força e combate.

Sobre: Bane é conhecido por sua enorme força física.`,

    "exterminador":
        `O Exterminador
Nome: Slade Wilson
Ocupação: Mercenário
Habilidades: Combate e estratégia.

Sobre: O Exterminador é um mercenário extremamente habilidoso.`,


    // ==========================================
    // AJUDA
    // ==========================================

    "ajuda":
        "Comandos disponíveis: Batmóvel, chá, status, câmeras, luzes, portão, comissário, Robin, Batgirl, vilões, Coringa, Pinguim, Charada, Bane e Liga da Justiça."
};


// ==========================================
// IMAGENS
// ==========================================

const imagens = {

    "coringa":
        "img/batman.png",

};


// ==========================================
// MOSTRAR IMAGEM
// ==========================================

function mostrarImagem(url, nome) {

    const imagem = document.createElement("img");

    imagem.src = url;

    imagem.alt = "Imagem de " + nome;

    imagem.className = "imagem-alfred";

    // Caso a imagem não carregue
    imagem.onerror = function () {
        imagem.remove();
    };

    terminal.appendChild(imagem);
}


// ==========================================
// ENVIAR PEDIDO
// ==========================================

function enviarPedido() {

    const pedido = input.value.trim();

    if (pedido === "") {
        return;
    }


    // ==========================================
    // MOSTRA O COMANDO DO USUÁRIO
    // ==========================================

    const comando = document.createElement("div");

    comando.className = "mensagem-usuario";

    comando.textContent =
        "BATCAVERNA@WAYNE: " + pedido;

    terminal.appendChild(comando);

    input.value = "";


    // ==========================================
    // RESPOSTA DO ALFRED
    // ==========================================

    setTimeout(() => {

        const resposta = document.createElement("div");

        resposta.className = "mensagem-alfred";


        const texto = pedido
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


        // ==========================================
        // PROCURA O COMANDO
        // ==========================================

        const chave = Object.keys(respostas).find(comando => {

            const comandoNormalizado = comando
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            return texto.includes(comandoNormalizado);

        });


        // ==========================================
        // MOSTRA A RESPOSTA
        // ==========================================

        resposta.textContent =
            "Alfred: " +
            (respostas[chave] ||
                "Não reconheço esse comando, senhor.");

        terminal.appendChild(resposta);


        // ==========================================
        // PROCURA UMA IMAGEM
        // ==========================================

        const imagemChave = Object.keys(imagens).find(nome => {

            return texto.includes(nome);

        });


        // ==========================================
        // MOSTRA A IMAGEM
        // ==========================================

        if (imagemChave) {

            mostrarImagem(
                imagens[imagemChave],
                imagemChave
            );

        }


        // ==========================================
        // ROLA O TERMINAL PARA BAIXO
        // ==========================================

        terminal.scrollTop =
            terminal.scrollHeight;

    }, 400);
}


// ==========================================
// BOTÃO ENTER
// ==========================================

botao.addEventListener(
    "click",
    enviarPedido
);


// ==========================================
// TECLA ENTER
// ==========================================

input.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            enviarPedido();

        }

    }
);


// ==========================================
// FOCA NO CAMPO DE TEXTO
// ==========================================

input.focus();
