// IMPROTS
// BROKER MQTT
const aedes = require('aedes')();
// CRIA AS PORTAS DE ACESSO 
const net = require('net');
// CRIA O SERVIÇO WS
const ws = require("ws");
// CRIA O SERVIÇO HTTP
const http = require("http");
// CRIA A API
const express = require('express');
// ADICIONA OUTROS METODOS HTTP
const cors = require('cors');
// DEPEDENCIAS
const router = require("./routers/router")

const fs = require("fs");
const path = require("path");

//PORTAS DAS APLICACOES
const PORTAAPI = 3333, PORTABROKER = 1883, PORTAWS = 9001;

const ExistFile = ({ fileName })=>{
    const filePath = path.join(__dirname, fileName);
    if (fs.existsSync(filePath)) {
        console.log("✅ O arquivo existe!");
        return true
    } else {
        return false
    }
}


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// Inicia a api
app.listen(PORTAAPI, () => {
  console.log('Servidor iniciado na porta ' + PORTAAPI); 
});




// Cria o servidor MQTT
const server = net.createServer(aedes.handle);

// Evento de conexão no broker
aedes.on('client', (client) => {
  console.log(`Cliente conectado: ${client.id} | Conexão: ${JSON.stringify(client.connDetails)}`);
});
  



// Evento de desconexão
aedes.on('clientDisconnect', (client) => {
  console.log(`Cliente desconectado: ${client.id} | Conexão: ${JSON.stringify(client.connDetails)}`);
});

aedes.on('publish', async (packet, client) => {
  const [para, por] = packet.topic.split('/');
  if (client) {
    const fileName = path.join(__dirname, "conversas", por + ".json");
    // verifica se o arquivo existe
    if (!fs.existsSync(fileName)) {
      // CONTEÚDO PADRÃO
      const conteudoPadrao = {
        nome: por,        // usa o nome do tópico
        status: "online", // status inicial
        mensagens: [
          {
            de: por,
            texto: packet.payload.toString(),
            hora: new Date().toISOString()
          }
        ]     // array com a primeira mensagem
      };

      // cria o arquivo com conteúdo padrão
      await fs.promises.writeFile(fileName, JSON.stringify(conteudoPadrao, null, 2), "utf8");
      console.log("Arquivo criado com sucesso!");
    }else{
      console.log({
        de: por,
        texto: packet.payload.toString(),
        hora: new Date().toISOString()
      });
      // 1. Lê o conteúdo do arquivo
      let data = await fs.promises.readFile(fileName, "utf8");
      // 2. Converte para objeto JS
      console.log("a");

      let json = JSON.parse(data);
      // 3. Adiciona uma nova mensagem
      json.mensagens.push({
        de: por,
        texto: packet.payload.toString(),
        hora: new Date().toISOString()
      });
      console.log("b");
            
      // 4. Converte de volta para JSON formatado
      let novoConteudo = JSON.stringify(json, null, 2);

      // 5. Salva no arquivo novamente
      await fs.promises.writeFile(fileName, novoConteudo, "utf8");

    }
  }
});

  
// Evento de inscrição em tópicos
aedes.on('subscribe', (subscriptions, client) => {
  console.log(`Cliente inscrito: ${client.id} | Tópicos: ${subscriptions.map(s => s.topic).join(', ')}`);
});
  


// Servidor HTTP + WebSockets para MQTT
const httpServer = http.createServer();
const wss = new ws.Server({ server: httpServer });

wss.on("connection", (ws) => {
  const stream = require("stream");
  const duplex = new stream.Duplex({
    read(size) {},
    write(chunk, encoding, callback) {
      ws.send(chunk, encoding, callback);
    },
  });

  duplex.on("data", (data) => ws.send(data));
  ws.on("message", (msg) => duplex.push(msg));
  ws.on("close", () => duplex.push(null));

  aedes.handle(duplex);
});



// Inicia o BROKER MQTT
server.listen(PORTABROKER, () => {
  console.log(`Broker MQTT rodando na porta ${PORTABROKER}`);
});

// Inicia o SERVIÇO HTTP + WEBSOCKETS
httpServer.listen(PORTAWS, () => {
  console.log(`Broker MQTT WebSocket rodando na porta ${PORTAWS}`);
});


// if (client) {
//     const fileName = path.join(__dirname, "conversas", por + ".json");

//     // verifica se o arquivo existe
//     if (!fs.existsSync(fileName)) {
//       // CONTEÚDO PADRÃO
//       const conteudoPadrao = {
//         nome: por,        // usa o nome do tópico
//         status: "online", // status inicial
//         mensagens: []     // array vazio
//       };

//       // cria o arquivo com conteúdo padrão
//       fs.writeFileSync(fileName, JSON.stringify(conteudoPadrao, null, 2), "utf8");
//       console.log("Arquivo criado com sucesso!");
//     }
//     console.log(fileName);
    
//     // 1. Lê o conteúdo do arquivo
//     let data = fs.readFileSync(fileName, "utf8");

//     // 2. Converte para objeto JS
//     let json = JSON.parse(data);

//     // 3. Adiciona uma nova mensagem
//     json.mensagens.push({
//       de: por,
//       texto: packet.payload.toString(),
//       hora: new Date().toISOString()
//     });
//     console.log({
//       de: por,
//       texto: packet.payload.toString(),
//       hora: new Date().toISOString()
//     });
    
//     // 4. Converte de volta para JSON formatado
//     let novoConteudo = JSON.stringify(json, null, 2);

//     // 5. Salva no arquivo novamente
//     fs.writeFileSync(fileName, novoConteudo, "utf8");
//   }