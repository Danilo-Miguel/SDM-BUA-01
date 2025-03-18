var idade = 18;
let nome = "João";
const pi = 3.14;
let ativo = true;

//conversão de String para Number

let num = Number("10");
let num2 = parseFloat("10.5"); 
let num3 = parseInt("10.7");

console.log("é aqui "+num3);

//conversão de Number para String

let strNum = (40).toString();
let strNum2 = String(2);

console.log("é aqui "+strNum);
console.log("é aqui "+strNum2);

console.log(idade);
console.log(nome);
console.log(pi);
console.log(ativo);

if (idade >= 18) {
    console.log("Maior de idade");
}