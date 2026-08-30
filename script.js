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




    "vilões":
        "Quais dos vilões você gostaria de saber? O Coringa, o Pinguim, a Mulher-Gato, o Charada, o Duas-Caras, o Espantalho, o Bane ou o Exterminador.",

    "mulher gato":
    "Aqui estão os arquivos de Selina Kyle, senhor",

    "selina":
        "Aqui estão os arquivos de Selina Kyle, senhor",

    "charada":
        "Aqui estão os arquivos de Edward Nigma, senhor",

    "nigma":
        "Aqui estão os arquivos de Edward Nigma, senhor",

    "duas caras":
        "Aqui estão os arquivos de Harvey Dent, senhor",

    "dent":
        "Aqui estão os arquivos de Harvey Dent, senhor",

    "espantalho":
        "Aqui estão os arquivos de Jonathan Crane, senhor",

    "crane":
        "Aqui estão os arquivos de Jonathan Crane, senhor",

    "exterminador":
        "Aqui estão os arquivos de Slade Wilson, senhor",

    "slade":
        "Aqui estão os arquivos de Slade Wilson, senhor",


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
        "img/coringa.jpg",

    "pinguim":
        "img/pingu.jpg",
        
    "mulher gato":
        "img/gato.jpg",
    
    "selina":
        "img/gato.jpg",

    "charada":
        "img/nigma.jpg",
    
    "nigma":
        "img/nigma.jpg",
    
    "espantalho":
        "img/palha.jpg",
    
    "crane":
        "img/palha.jpg",
    
    "bane":
        "img/bane.jpg",
    
    "exterminador":
        "img/slade.jpg",
    
    "slade":
        "img/slade.jpg",

    "duas caras":
        "img/caras.jpg",
    
    "dent":
        "img/caras.jpg"


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



async function perguntarParaIA(pergunta) {

    try {

        const resposta = await fetch("/api/alfred", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                pergunta: pergunta
            })

        });

        const dados = await resposta.json();

        return dados.resposta;

    }
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
    

    setTimeout(async () => {

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
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    return texto === comandoNormalizado;

});


        // ==========================================
        // MOSTRA A RESPOSTA
        // ==========================================

        if (chave) {

    resposta.textContent =
        "Alfred: " + respostas[chave];

} else {

    resposta.textContent =
        "Alfred: " + await perguntarParaIA(pedido);

}

terminal.appendChild(resposta);


        // ==========================================
        // PROCURA UMA IMAGEM
        // ==========================================

        const imagemChave = Object.keys(imagens).find(nome => {

    const nomeNormalizado = nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    return texto === nomeNormalizado;

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
