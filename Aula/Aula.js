let pessoa = {};
pessoa.nome = "Kleber";
pessoa.sobreNome = "Silva";
pessoa.idade = 28;

pessoa.veiculos = "Ford Ka";

pessoa.apresentar.Nome = function(){
    console.log(this.nome + " " + this.sobreNome)
}

pessoa.apresentarNome()

pessoa.endereco = {
    numero: 144,
    rua: "X",
    bairro: "Centro"
}