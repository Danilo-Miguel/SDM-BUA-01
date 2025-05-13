const express = require('express');  // Importa express
const http = require('http'); // Importa http
const cors = require('cors'); // Importa cors
const socktetIo = require('socket.io'); // Importa socket.io

// Crea una instancia de express
const app = express();
// Crea una instancia de http
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = socktetIo(server, {  
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    });

    let usuarios = []; 
    let pedidos= [];

      // Quando o cliente se conecta
    io.on('connection', (socket) => { // Escuta a conexão de um cliente
        console.log('Cliente conectado via websocket'); 

      // Quando o cliente se desconecta
        socket.on('disconnect', () => { // 
            console.log('Cliente desconectado'); // consola
        });

        });

        // Rota para cadastra novo usuario
        app.post('/usuario', (req, res) => { // Rota para cadastrar um novo usuario
            const usuario = req.body; // Pega o nome do usuario do corpo da requisição
            usuarios.push(usuario); // Adiciona o usuario ao array de usuarios
           
            io.emit('novo usuário', usuario); // Emite o evento 'usuarios' para todos os clientes conectados

            res.status(200).json({ message: 'Usuario cadastrado com sucesso' }); // Retorna uma resposta de sucesso
        });

             // Rota para cadastrar novo pedido
        app.post('/pedidos', (req, res) => { // Rota para cadastrar um novo pedido
            const pedido = req.body; // Pega o nome do pedido do corpo da requisição
            pedidos.push(pedido); // Adiciona o pedido ao array de pedidos
           
            io.emit('novo pedido', pedido); // Emite o evento 'usuarios' para todos os clientes conectados

            res.status(200).json({ message: 'Pedido cadastrado com sucesso' }); // Retorna uma resposta de sucesso
        });

        app.get('/dados', (req, res) => { // Rota para pegar todos os pedidos
            res.status(200).json(pedidos, usuarios); // Retorna todos os pedidos
        });
    
        // Inicia o servidor na porta 3000
        server.listen(3000, () => { // Inicia o servidor na porta 3000
            console.log('Servidor rodando na porta 3000'); // console
        });
       
    

