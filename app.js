const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Permite conexões de qualquer origem (ajuste se necessário)
    methods: ["GET", "POST"]
  }
});

app.use(cors()); // Habilita CORS para requisições HTTP
app.use(express.json());

let usuarios = [];
let pedidos = [];

// WebSocket: conexão com cliente
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });

  socket.on("pedido_pronto", (data) => {
    console.log(`Pedido ${data.id} foi marcado como pronto`);
    // Aqui você pode marcar como pronto no "banco de dados", emitir para o garçom, etc.
  });
});

// Rota para cadastrar novo usuário
app.post("/usuarios", (req, res) => {
  const usuario = req.body;
  usuarios.push(usuario);

  io.emit("novo_usuario", usuario);
  res.send({ message: "Usuário cadastrado!", usuario });
});

// Rota para criar pedido
app.post("/pedidos", (req, res) => {
  const pedido = req.body;
  pedido.id = Date.now(); // Gera ID único com timestamp

  pedidos.push(pedido);
  io.emit("novo_pedido", pedido);

  res.send({ message: "Pedido criado!", pedido });
});

// Rota para consultar pedidos e usuários
app.get("/dados", (req, res) => {
  res.send({ usuarios, pedidos });
});

// Inicia o servidor
server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 com WebSocket");
});
