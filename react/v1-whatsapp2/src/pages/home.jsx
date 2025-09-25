import { useEffect, useState } from "react"
import ConnApi from "../services/axios";

const Home = ()=>{
    const [conversas, setConversas] = useState();
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
                            <div key={index} className="sidebar-item">
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
        </div>
    )
}
export default Home