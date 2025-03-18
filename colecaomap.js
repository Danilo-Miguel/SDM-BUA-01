let mapa = new Map();

mapa.set("nome", "João");
mapa.set("idade", 18);


console.log(mapa.get("nome"));
console.log(mapa.has(39));
console.log(mapa.size);

mapa.forEach((valor, chave) => {
    console.log(`${chave}: ${valor}`);
});