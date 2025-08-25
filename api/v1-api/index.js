// IMPROTS
// BROKER MQTT
const aedes = require('aedes')();
// CRIA AS PORTAS DE ACESSO 
const net = require('net');
// CRIA O SERVIÇO WS
const ws = require("ws");
// CRIA O SERVIÇO HTTP
const http = require("http");
//CONEXÃO COM BANCO

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
    console.log(`Mensagem publicada: ${packet.topic} | Conteúdo: ${packet.payload.toString()} | Cliente: ${client ? client.id : 'Desconhecido'}`);
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
server.listen(1883, () => {
  console.log(`Broker MQTT rodando na porta ${1883}`);
});

// Inicia o SERVIÇO HTTP + WEBSOCKETS
httpServer.listen(9001, () => {
  console.log(`Broker MQTT WebSocket rodando na porta ${9001}`);
});
