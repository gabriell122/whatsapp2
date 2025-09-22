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
const { FileExists, default: ExistsSync } = require('./utils/existSync');
const path = require('path');
const { default: ReadSync } = require('./utils/readSync');
const { default: DefaultFile } = require('./utils/defaultFile');

//PORTAS DAS APLICACOES
const PORTAAPI = 3333;
const USER = "gabriell"

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
  client.subscribe( USER +"/#", (err) => {
    if (!err) {
      console.log("Inscrito em teste");
    }
  });
});

// Escuta as mensagens
client.on("message", (topic, message) => {
  console.log(topic);
  console.log(message.toString());
  
  const [ get, post] = topic.split('/');
  const pathPost = path.join( __dirname, "conversas", post + ".json")
  if (ExistsSync({path: pathPost})) {
    const dataFile = ReadSync({ path: pathPost});
    if (!dataFile) {
      console.log("Erro ao Ler o arquivo");
      return
    }
    
  } else {
    if (DefaultFile({path: pathPost, data: message.toString(), post: post})) {
      
    }else{
      return
    }
  }



});