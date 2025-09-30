import { useEffect, useState } from "react"
import ConnApi from "../services/axios";
import GetMensagens from "../api/getMensagens";
import PostMensagens from "../api/postMensagens";
import GetConversas from "../api/getConversas";
import PostConversas from "../api/postConversas"
import { useMQTT } from "../mqtt/mqtt";

const Home = ()=>{
    const [conversas, setConversas ] = useState();
    const [conversa, setConversa ] = useState("");
    const [ selected, setSelected ] = useState("anadias");
    const [ mensagem, setMensagem ] = useState("")
    const [ reload, setReload ] = useState(true)
    const { client, isConnected } = useMQTT();
    const [ novaConversa, setNovaConversa] = useState("")
    const [ reload2, setReload2 ] = useState(true)
    useEffect(()=>{
        if(client && isConnected){
            const topic = "gabriell/#"
            client.subscribe(topic, (err) => {
                if (err) 
                    console.error('Erro ao se inscrever:', err);
            });
            client.on('message', (topic, mensagem)=>{
                const [ get, post] = topic.split('/');
                if( post === selected)
                    setReload(!reload)                    
            });

        }
    },[])

    // Buscar mensagens da conversa selecionada
    useEffect(() => {
        const fetchMensagens = async () => {
            try {
                const res  = await GetMensagens({get:selected})
                if(res.success)
                    setConversa(res.data);
                else
                    console.log(res);
            } catch (err) {
                console.error("Erro ao buscar mensagens:", err);
            }
        };
        fetchMensagens();
    }, [selected, reload]);


    // Buscar lista de conversas
    useEffect(() => {
        const fetchConversas = async () => {
            try {
                const res = await GetConversas()
                console.log(res);
                
                if(res.success)
                    setConversas(res.data);
                else
                    console.log("erro");
            } catch (err) {
                console.log(err);
            }
        };
        fetchConversas();
    }, [reload2]);


    const EnviarMensagem = async ()=>{
        try {
            if(mensagem){
                const res = await PostMensagens({post:selected, mensagem:mensagem})
                if (res.success){
                    setReload(!reload)
                    setMensagem("")
                }
                else
                    console.log(res);
            }else
                console.log("campo vazio");
                
        } catch (err) {
            console.log(err);
        }
    }
    const NovaConversa = async ()=>{
        try {
            if(novaConversa){
                const res = await PostConversas({post: novaConversa})
                if (res.success){
                    setNovaConversa("")
                    setSelected(novaConversa)
                    setReload2(!reload2)
                }   
                else
                    console.log(res);
            }else
                console.log("campo vazio");
        } catch (error) {
            console.log(err);
        }
    }

    return(
        <div className="c12 h1h green df ">
            <div className="c4 cm5 blue h1">
                <div className="sidebar">
                    <div className="sidebar-header">
                        Conversas
                    </div>

                    <div className="sidebar-list">
                        {conversas && conversas.length > 0 ? (
                        conversas.map((item, index) => (
                            <div className="sidebar-item" onClick={()=>{setSelected(item)}}>
                            {item}
                            </div>
                        ))
                        ) : (
                        <p className="sidebar-empty">Nenhuma conversa</p>
                        )}
                    </div>
                    

                    <div class="novo-chat bsbb">
                        <div class="adicionar-conversa tac" onClick={()=>NovaConversa()}>
                            + Adicionar Conversa
                        </div>
                        <input type="text" placeholder="Adicionar conversa..." class="input-conversa" value={novaConversa} onChange={(e)=>{setNovaConversa(e.target.value)}}/>
                    </div>
                    <div className="sidebar-footer">
                        WhatsApp2 • MQTT
                    </div>
                </div>
            </div>

            {
                conversa
                ?
                    <div className="c10 cm9 h1 ">
                        <div className="chat-body">
                            <div className="chat-header">
                                <div className="chat-info">
                                    <h2>{selected}</h2>
                                </div>
                            </div>
                            <div className="chat-messages">
                                {
                                    conversa 
                                    ?
                                        conversa.map((msg, index) => (
                                            
                                        <div
                                            className={`message ${msg.de === "gabriell" ? "sent" : "received"}`}
                                        >
                                            <div className="text">{msg.texto}</div>  
                                            <div className="time">
                                            {new Date(msg.hora).toLocaleTimeString("pt-BR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                            </div> 
                                        </div>
                                        ))
                                    :
                                        ""
                                }
                            </div>
                            <div className="chat-input">
                                <input type="text" placeholder="Digite uma mensagem..." value={mensagem} onChange={(e)=>{setMensagem(e.target.value)}}/>
                                <button onClick={()=>{EnviarMensagem()}}>Enviar</button>
                            </div>
                        </div>
                    </div>
                :""
            }
        </div>
    )
}
export default Home