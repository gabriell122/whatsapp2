
import './App.css'
import { useState, useEffect } from 'react'
import mqtt from "mqtt";
function App() {

  const [client , setClient ] = useState(null);
  const [ mensagens, setMensagens ] = useState([]);
  const [subTopic, setSubTopic] = useState("");
  const [pubTopic, setPubTopic] = useState("");
  const [ mensage, setMensagem ] = useState("")
  useEffect(() => {
    const options = {
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    };
    // Conectar ao broker (precisa estar habilitado para WS)
    const mqttClient = mqtt.connect("ws://localhost:9001", options); // Porta WS (não a 1883 padrão TCP)
    setClient(mqttClient);

    mqttClient.on('connect', () => {
      console.log('MQTT conectado:', mqttClient.options.clientId);
    });

    mqttClient.on('error', (err) => {
      console.error('Erro MQTT:', err);
    });

    mqttClient.on('reconnect', () => {
      console.log('Tentando reconectar...');
    });

    mqttClient.on("message", (topic, payload) => {
        console.log(`Mensagem recebida do tópico ${topic}: ${payload.toString()}`);
    });
    return () => {
      // NÃO encerra a conexão aqui
      // Isso evita que a reconexão cause múltiplos clients
    };
  }, []);


  const novoTopico = ()=>{
    client.subscribe(subTopic,(err) => {
        if (!err) {
          console.log("Inscrito em " + subTopic);
        }else{
          console.log(err);
          
        }
      } 
    )
  }

  const Publicar = ()=>{
    console.log("a");
    
    if(!client)return;
      client.publish(`${pubTopic}`, mensage);
  }

useEffect(() => {
  if (!client) return;

  const handleMessage = (pubTopic, message) => {
    setMensagens(prev => [...prev, message.toString()]);
  };
  // const handleMessage = (pubTopic, message) => {
  //   const msgStr = message.toString();
  //   const novaMsg = { topico: pubTopic, mensage: msgStr };

  //   setMensagens(prev =>
  //     prev.some(m => m.topico === pubTopic && m.mensage === msgStr)
  //       ? prev
  //       : [...prev, novaMsg]
  //   );
  // };

  client.on("message", handleMessage);

  return () => {
    client.off("message", handleMessage);
  };
}, [client]);


  return(
    <div className="">
      <div>
          <label htmlFor="topico">
            Increver-se em um Topico
          </label>
          <input type="text" value={subTopic} onChange={(e)=>setSubTopic(e.target.value)}/>
          <input type="button" value="Increver-se" onClick={()=>novoTopico()}/>
      </div>
      <div className="">
          <label htmlFor="topico">
            Publica Mensagem em um Topico
          </label>
          <input type="text" placeholder='mensagem' value={mensage} onChange={(e)=>setMensagem(e.target.value)}/>
          <input type="text" value={pubTopic} onChange={(e)=>setPubTopic(e.target.value)}/>
          <input type="button" value="Publicar" onClick={()=>Publicar()}/>
      </div>
      <div>
        <h2>Mensagens recebidas</h2>
          { 
            mensagens 
            ?
            mensagens.map((item, index)=>{
              return(
                <p key={index}>
                  {item}
                </p>
              )
            })
            :
            ""
          }
      </div>
    </div>
  )


  // const [mensagem, setMensagem] = useState("");
  // const [conversas, setConversas] = useState([
  //   {id: 1, nome: "João", mensagem: "Olá!"},  
  //   {id: 2, nome: "Maria", mensagem: "Oi, tudo bem?"},
  // ]);
  // const [texto, setTexto] = useState("")
  // const [client, setClient] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);
  // const [message, setMessage] = useState("");
  // const [topicoSub, setTopicoSub] = useState("");
  // const [topicoPub, setTopicoPub] = useState("")
  // useEffect(() => {
  //   // Conectar ao broker (precisa estar habilitado para WS)
  //   const mqttClient = mqtt.connect("ws://localhost:9001"); // Porta WS (não a 1883 padrão TCP)
  //   setClient(mqttClient);

  //   mqttClient.on("connect", () => {
  //     console.log("Conectado ao broker MQTT!");
  //     setIsConnected(true);

  //     // Se inscreve em um tópico
  //     mqttClient.subscribe( topicoSub, (err) => {
  //       if (!err) {
  //         console.log("Inscrito em " + topicoSub);
  //       }
  //     });
  //   });

  //   mqttClient.on("message", (topic, payload) => {
  //     console.log(`Mensagem recebida do tópico ${topic}: ${payload.toString()}`);
  //     setMessage(payload.toString());
  //   });

  //   mqttClient.on("error", (err) => {
  //     console.error("Erro: ", err);
  //   });

  //   return () => {
  //     if (mqttClient) mqttClient.end();
  //   };
  // }, [topicoSub]);


  // const enviarMensagem = () => {
  //   if (client && isConnected) {
  //     client.publish(topicoPub, texto);
  //   }
  // }

  // const novoTopico = ({ topic})=>{

  // }


  // return (
  //   <div>
  //     <h1>MQTT React</h1>
  //     <p>Status: {isConnected ? "Conectado" : "Desconectado"}</p>
  //     <p>Última mensagem: {message}</p>
  //     <p>subscrição</p>
  //     <input type="text" value={topicoSub} onChange={(e)=>{setTopicoSub(e.target.value)}}/>
  //     <p>publicação</p>
  //     <input type="text" value={topicoPub} onChange={(e)=>{setTopicoPub(e.target.value)}}/>
  //     <input type="text" value={texto} onChange={(e)=>{setTexto(e.target.value)}}/>
  //     <button onClick={enviarMensagem}>Enviar mensagem</button>
  //   </div>
  // );


  return (
    <>
      <div className="c12 h1h df ac jcc green">
        <div className="sidbar c2 cm3 cl4 h1 df ac jcc cinza pa l0 t0">

        </div>
        <div className="body c10 cm9 cl8 h1 df ac jcsa pa r0 t0 fdc">
            <div className="c10 cl11 h075 br10 black">

            </div>
            <div className="mensage h40 c10 cl11 br10 black">
                <input 
                  type="text" 
                  className='c11 cl10 h1 brl10 bsbb'
                  value={mensagem}
                  onChange={(e)=>setMensagem(e.target.value)}
                />
                <input 
                  type="button" 
                  value="Enviar" 
                  className='c1 cl2 h1 bsbb brr10'
                  onClick={
                    ()=>{
                      console.log("Mensagem enviada");
                      console.log(mensagem);
                      
                    }
                  }
                />
            </div>
        </div>
      </div>
    </>
  )
}

export default App

// function App() {

//   const [client , setClient ] = useState(null);
//   const [ mensagens, setMensagens ] = useState([]);
//   const [subTopic, setSubTopic] = useState("");
//   const [pubTopic, setPubTopic] = useState("");
//   const [ mensage, setMensagem ] = useState("")
//   useEffect(() => {
//     const options = {
//       connectTimeout: 4000,
//       reconnectPeriod: 1000,
//     };
//     // Conectar ao broker (precisa estar habilitado para WS)
//     const mqttClient = mqtt.connect("ws://localhost:9001", options); // Porta WS (não a 1883 padrão TCP)
//     setClient(mqttClient);

//     mqttClient.on('connect', () => {
//       console.log('MQTT conectado:', mqttClient.options.clientId);
//     });

//     mqttClient.on('error', (err) => {
//       console.error('Erro MQTT:', err);
//     });

//     mqttClient.on('reconnect', () => {
//       console.log('Tentando reconectar...');
//     });

//     mqttClient.on("message", (topic, payload) => {
//         console.log(`Mensagem recebida do tópico ${topic}: ${payload.toString()}`);
//     });
//     return () => {
//       // NÃO encerra a conexão aqui
//       // Isso evita que a reconexão cause múltiplos clients
//     };
//   }, []);


//   const novoTopico = ()=>{
//     client.subscribe(subTopic,(err) => {
//         if (!err) {
//           console.log("Inscrito em " + subTopic);
//         }else{
//           console.log(err);
          
//         }
//       } 
//     )
//   }

//   const Publicar = ()=>{
//     console.log("a");
    
//     if(!client)return;
//       client.publish(`${pubTopic}`, mensage);
//   }

// useEffect(() => {
//   if (!client) return;

//   const handleMessage = (pubTopic, message) => {
//     setMensagens(prev => prev.includes(message.toString()) ? prev : [...prev, { "topico": pubTopic,"mensage":  message.toString() }]);
//   };

//   client.on("message", handleMessage);

//   return () => {
//     client.off("message", handleMessage);
//   };
// }, [client]);


//   return(
//     <div className="">
//       <div>
//           <label htmlFor="topico">
//             Increver-se em um Topico
//           </label>
//           <input type="text" value={subTopic} onChange={(e)=>setSubTopic(e.target.value)}/>
//           <input type="button" value="Increver-se" onClick={()=>novoTopico()}/>
//       </div>
//       <div className="">
//           <label htmlFor="topico">
//             Publica Mensagem em um Topico
//           </label>
//           <input type="text" placeholder='mensagem' value={mensage} onChange={(e)=>setMensagem(e.target.value)}/>
//           <input type="text" value={pubTopic} onChange={(e)=>setPubTopic(e.target.value)}/>
//           <input type="button" value="Publicar" onClick={()=>Publicar()}/>
//       </div>
//       <div>
//         <h2>Mensagens recebidas</h2>
//           { 
//             mensagens 
//             ?
//             mensagens.map((item, index)=>{
//               return(
//                 <div key={index}>
//                   <p>
//                     topico:
//                     {item.topico}
//                   </p>
//                   <p>
//                     mensagem: 
//                     {item.mensagem}
//                   </p>
//                 </div>
//               )
//             })
//             :
//             ""
//           }
//       </div>
//     </div>
//   )
// }


