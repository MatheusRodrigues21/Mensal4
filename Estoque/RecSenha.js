document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form"); // Seleciona o formulário
    const button = document.querySelector("form button"); // Seleciona o botão

    form.addEventListener("submit", function(event) {
        // Previne o envio padrão do formulário
        event.preventDefault();

        // Obtém os valores dos inputs
        const inputs = form.querySelectorAll("input");
        const usuario = inputs[0].value.trim(); // Valor do campo usuário
        const email = inputs[1].value.trim();   // Valor do campo e-mail
        const cpf = inputs[2].value.trim();     // Valor do campo CPF

        // Verifica se pelo menos um campo foi preenchido
        if (usuario === "" && email === "" && cpf === "") {
            alert("Por favor, preencha ao menos um campo."); // Mensagem de erro
            return; // Para o envio do formulário
        }

        // Se a validação passar, exibe uma mensagem de sucesso
        alert("Solicitação de recuperação enviada com sucesso!");

        // Limpa os campos do formulário
        form.reset();
    });
});