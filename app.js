const express = require("express");
const http = require("http");
const cors = require("cors"); // <= importa o CORS
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

// Aplica o CORS no Express
app.use(cors());
app.use(express.json());

const io = socketIo(server, {
  cors: {
    origin: "*", // Libera todas as origens. Para produção, especifique apenas os domínios permitidos.
    methods: ["GET", "POST"]
  }
});

// Banco de dados em memória
let usuarios = [];
let pedidos = [];

// WebSocket
io.on("connection", (socket) => {
  console.log("Cliente conectado via WebSocket:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Rota para criar usuário
app.post("/usuarios", (req, res) => {
  const usuario = req.body;
  usuarios.push(usuario);
  io.emit("novo_usuario", usuario);
  res.send({ message: "Usuário cadastrado!", usuario });
});

// Rota para criar pedido
app.post("/pedidos", (req, res) => {
  const pedido = req.body;
  pedidos.push(pedido);
  io.emit("novo_pedido", pedido);
  res.send({ message: "Pedido criado!", pedido });
});

// Rota para ver os dados
app.get("/dados", (req, res) => {
  res.send({ usuarios, pedidos });
});

// Inicia o servidor
server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 com WebSocket");
});
