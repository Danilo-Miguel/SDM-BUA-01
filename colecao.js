let map = new Map()

map.set("nome", "Diego")
map.set("idade", 21)


console.log(map.get("nome"))
console.log(map.has("idade"))
console.log(map.size)

map.forEach((valor, chave)=>{
    console.log(`${chave}: ${valor}`)
})