const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Conexão com MongoDB Atlas
// const mongoUri = "mongodb+srv://profdanilomiguel:usjt*20251@usjt.tz3jhkm.mongodb.net/?retryWrites=true&w=majority&appName=usjt";
const mongoUri = "mongodb+srv://profdanilomiguel:usjt*20251@usjt.tz3jhkm.mongodb.net/mongo-microsservices?retryWrites=true&w=majority&appName=usjt";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado no Order-Service"))
  .catch(err => console.log("Erro ao conectar no MongoDB", err));

// Schema para pedidos
const orderSchema = new mongoose.Schema({
  userId: String,
  produto: String,         // novo campo adicionado: nome do produto
  quantidade: Number,      // novo campo adicionado: quantidade do produto
  status: { type: String, default: "pendente" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Rota para processar um pedido
app.post("/pedidos", async (req, res) => {
  try {
    const pedido = req.body;                    // Recebe o JSON com os dados do pedido
    const novoPedido = new Order(pedido);       // Cria um novo pedido com base no schema
    await novoPedido.save();                    // Salva no MongoDB

    console.log("Pedido recebido:", novoPedido); // Log no terminal para depuração
    res.send({ message: "Pedido processado!", pedido: novoPedido });
  } catch (error) {
    res.status(500).send({ error: "Erro ao processar pedido" });
  }
});

app.listen(4000, () => console.log("Order-Service rodando na porta 4000"));
