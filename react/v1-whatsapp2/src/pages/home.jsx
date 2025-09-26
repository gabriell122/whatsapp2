import { useEffect, useState } from "react"
import ConnApi from "../services/axios";

const Home = ()=>{
    const [conversas, setConversas ] = useState();
    const [conversa, setConversa ] = useState("");
    const [ selected, setSelected ] = useState("anadias");
    useEffect( async ()=>{
        
        const res = await ConnApi.get(`/mensagens/${selected}`)
        console.log(res.data.data);
        setConversa(res.data.data)
    },[selected])
    useEffect( async ()=>{
        const res = await ConnApi.get("/conversas")
        console.log(res.data.data);
        setConversas(res.data.data)
    },[])
    return(
        <div className="c12 h1h green">
            <div className="c2 cm3 blue h1">
                <div className="sidebar">
                    <div className="sidebar-header">
                        Conversas
                    </div>

                    <div className="sidebar-list">
                        {conversas && conversas.length > 0 ? (
                        conversas.map((item, index) => (
                            <div key={index} className="sidebar-item" onClick={()=>setSelected(item)}>
                            {item}
                            </div>
                        ))
                        ) : (
                        <p className="sidebar-empty">Nenhuma conversa</p>
                        )}
                    </div>

                    <div className="sidebar-footer">
                        WhatsApp2 • MQTT
                    </div>
                </div>
            </div>

            <div className="c10 cm9 h1 ">
                <div className="chat-body">
                    {/* Cabeçalho com nome e status */}
                    <div className="chat-header">
                        <div className="chat-info">
                        <h2>{conversa.nome}</h2>
                        <span className={`status ${conversa.status === "online" ? "online" : ""}`}>
                            {conversa.status}
                        </span>
                        </div>
                    </div>

                    {/* Área de mensagens */}
                    <div className="chat-messages">
                        {
                            conversa.mensagens
                            ?
                                conversa.mensagens.map((msg, index) => (
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

                    {/* Campo de envio (opcional) */}
                    <div className="chat-input">
                        <input type="text" placeholder="Digite uma mensagem..." />
                        <button>Enviar</button>
                    </div>
                </div>

            </div>  
        </div>
    )
}
export default Home