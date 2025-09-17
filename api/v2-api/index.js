// IMPROTS
// CRIA A API
const express = require('express');
// ADICIONA OUTROS METODOS HTTP
const cors = require('cors');
// MQTT-CLIENT
const mqtt = require("mqtt");

// DEPEDENCIAS
const router = require("./routers/router")

const fs = require("fs");
const path = require("path");
const { FileExists } = require('./utils/fileExists');

//PORTAS DAS APLICACOES
const PORTAAPI = 3333;


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// Inicia a api
app.listen(PORTAAPI, () => {
  console.log('Servidor iniciado na porta ' + PORTAAPI); 
});




// Conectar ao broker
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Conectado ao broker MQTT");

  // Subscreve no tópico desejado
  client.subscribe("teste", (err) => {
    if (!err) {
      console.log("Inscrito em teste");
    }
  });
});

// Escuta as mensagens
client.on("message", (topic, message) => {
  console.log(`Mensagem recebida em ${topic}: ${message.toString()}`);

  // aqui você pode salvar em banco, chamar API, etc.
});