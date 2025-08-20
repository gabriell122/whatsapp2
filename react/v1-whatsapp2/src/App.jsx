
import './App.css'
import { useState } from 'react'
function App() {
  const [mensagem, setMensagem] = useState("");
  const [conversas, setConversas] = useState([
    {id: 1, nome: "João", mensagem: "Olá!"},  
    {id: 2, nome: "Maria", mensagem: "Oi, tudo bem?"},
  ]);
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
