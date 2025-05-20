const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Conexão com MongoDB Atlas
// const mongoUri = "mongodb+srv://profdanilomiguel:usjt*20251@usjt.tz3jhkm.mongodb.net/?retryWrites=true&w=majority&appName=usjt";
const mongoUri = "mongodb+srv://profdanilomiguel:usjt*20251@usjt.tz3jhkm.mongodb.net/mongo-microsservices?retryWrites=true&w=majority&appName=usjt";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado no User-Service"))
  .catch(err => console.log("Erro ao conectar no MongoDB", err));

// Definição do schema do usuário
const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  produto: String,         // novo campo opcional para passar junto
  quantidade: Number       // novo campo opcional para passar junto
});

const User = mongoose.model("User", userSchema);

// Rota para cadastrar um usuário
app.post("/usuarios", async (req, res) => {
  try {
    const usuario = req.body;

    // Salva o usuário no banco
    const novoUser = new User(usuario);
    await novoUser.save();

    // Notifica o order-service com dados do pedido
    await axios.post("http://localhost:4000/pedidos", {
      userId: usuario.id,
      produto: usuario.produto,           // envia nome do produto
      quantidade: usuario.quantidade      // envia quantidade
    });

    res.send({ message: "Usuário cadastrado!", usuario: novoUser });
  } catch (error) {
    res.status(500).send({ error: "Erro ao cadastrar usuário" });
  }
});

app.listen(3000, () => console.log("User-Service rodando na porta 3000"));
