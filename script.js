const botao = document.getElementById("btn-pedido");
const input = document.getElementById("pedido");
const terminal = document.getElementById("terminal-body");

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

    "ajuda": "Comandos disponíveis: Batmóvel, chá, status, câmeras, luzes e portão."
};


// ENVIAR PEDIDO

function enviarPedido() {

    const pedido = input.value.trim();

    if (pedido === "") {
        return;
    }


    // MOSTRA O COMANDO DO USUÁRIO

    const comando = document.createElement("div");

    comando.className = "mensagem-usuario";

    comando.textContent = "BATCAVERNA@WAYNE: " + pedido;

    terminal.appendChild(comando);

    input.value = "";

    setTimeout(() => {

        const resposta = document.createElement("div");

        resposta.className = "mensagem-alfred";


        const texto = pedido.toLowerCase();

        const chave = Object.keys(respostas).find(comando =>
            texto.includes(comando)
        );


        resposta.textContent =
            "Alfred: " +
            (respostas[chave] || "Não reconheço esse comando, senhor.");


        terminal.appendChild(resposta);

        terminal.scrollTop = terminal.scrollHeight;

    }, 400);
}


botao.addEventListener("click", enviarPedido);


input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        enviarPedido();
    }

});


input.focus();
