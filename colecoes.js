let numeros = [10 , 20 , 30 , 40, 50]
console.log(numeros[2])

let frutas = ["Maçã" , "Banana", "Laranja"];


// Interando sobre os elementos do array
frutas.forEach((fruta, index) =>{
    console.log(`${index}: ${fruta}`);
   
});

// Adicionando elementos

frutas.push("Uva")
frutas.unshift("Melão")

console.log(frutas)

//Removendo elementos

frutas.pop();
frutas.shift();

frutas.splice(2,1)
console.log(frutas)


let mapa = new Map()

mapa.set("nome", "Joana")
mapa.set( 39, "Idade", )

//Acessando valores

console.log(mapa.get("nome"))
console.log(mapa.get(39))
