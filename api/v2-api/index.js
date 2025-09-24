// IMPROTS
// CRIA A API
const express = require('express');
// ADICIONA OUTROS METODOS HTTP
const cors = require('cors');
// MQTT-CLIENT
const mqtt = require("mqtt");
// DEPEDENCIAS
const router = require("./routers/router")
const path = require('path');

const { default: ExistsSync } = require('./utils/existSync');
const { default: ReadSync } = require('./utils/readSync');
const { default: DefaultFile } = require('./utils/defaultFile');
const { default: SaveSync } = require('./utils/saveSync');

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

//ESCUTA TODAS AS MENSAGENS DO USUARIO
client.on("message", (topic, message) => {
  //USUARIO QUE RECEBE / QUE ENVIA
  const [ get, post] = topic.split('/');
  //CAMINHO DO ARQUIVO
  const pathPost = path.join( __dirname, "conversas", post + ".json")
  //VERIFICA SE O ARQUIVO EXISTE
  if (ExistsSync({path: pathPost})) {
    //LE O ARQUIVO
    const dataFile = ReadSync({ path: pathPost});
    if (!dataFile) {
      console.log("Erro ao Ler o arquivo");
      return
    }
    //FALTA FAZER A GRAVURA DA MENSAGEM
    const dataJson = JSON.parse(dataFile)
    dataJson.mensagens.push({
      de: por,
      texto: packet.payload.toString(),
      hora: new Date().toISOString()
    });
    if (SaveSync({data: JSON.stringify(dataJson, null, 2), path:pathPost})) {
      console.log("mensagem salva com susceso");
    }else{
      console.log("erro");
    }

  } else {
    //SE O ARQUIVO NÃO EXISTIR CRIA ELE E ADCIONA A MENSAGEM
    if (!DefaultFile({path: pathPost, data: message.toString(), post: post})) {
      return
    }
  }
});