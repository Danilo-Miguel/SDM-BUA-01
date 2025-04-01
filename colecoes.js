let numeros = [1, 2, 3, 4, 5];
console.log(numeros[2]);

let frutas = ["maça", "Banana", "Laranja" ]

frutas.forEach((frutas, index) => {
    console.log(`${index}: ${frutas}`);
});

//adicinando element

frutas.push("Uva");
frutas.unshift("Morango");

console.log(frutas);

//removendo elemento

frutas.pop("Uva");
console.log(frutas);
frutas.shift();

console.log(frutas);