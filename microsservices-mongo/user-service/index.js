const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();

// conexão mongo Atlas

const mongoUri = "mongodb+srv://profdanilomiguel:usjt*2025@sdm-bua.wosqt56.mongodb.net/orderservice?retryWrites=true&w=majority&appName=sdm-bua";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

  const orderSchema =  new mongoose.Schema({
   id: String,
   name: String,
    email: String,
    produto: String,
    quantidade: Number,
  });

  const User = mongoose.model('User', orderSchema);

  app.post('/usuarios', async (req, res) => {

    try {
    const usuario = req.body;
    const user = new User(usuario);
    await user.save();

await axios.post('http://localhost:4000/pedidos', {
  userId: usuario.id,
  produto: usuario.produto,
  quantidade: usuario.quantidade,

  });

  res.send({message: "Usuário criado com sucesso", usuario:novoUser});
}
catch (error) {
  console.error('Erro ao criar usuário:', error);
  res.status(500).send({ message: 'Erro ao criar usuário' });
}});

app.listen(3000, () => {
  console.log('User service running on port 3000');
});