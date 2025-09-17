const fs = require("fs").promises;
const path = require("path");

module.exports = {

    //REGISTRA AS MENSAGENS ENVIADAS PELO USUARIO PARA OUTRAS PESSOAS
    async MensagensPost (req, res){
        try {
            
            //PEGA AS INFORMAÇÕES DO BODY
            const { conversas, mensagens} = req.body;
            
            //PEGA O CAMINO DO ARQUIVO
            const filePath = path.join( __dirname, "../", "conversas", conversas + ".json");

            //LE O ARQUIVO DA CONVERSA
            let data = await fs.readFile(filePath, "utf8");

            //TRANSFORMA EM OBJETO JS
            let json = JSON.parse(data);

            //ADICIONA A NOVA MENSAGEM
            json.mensagens.push({
                de:"gabriell",
                texto: mensagens,
                hora: new Date().toISOString()
            })

            //TRANSFORMA EM JSON STRING
            data = JSON.stringify( json, null, 2);

            //GRAVA AS AUTERAÇÕES
            await fs.writeFile( filePath, data, "utf8");

            //RETORNA SUSCESO
            return res.status(201).json({
                confirma:true,
                data: "create",
                erro: null
            })
        } catch (error) {
            return res.status(400).json({
                confirma:false,
                erro: error
            })
        }
    },
    async MensagensGet ( req, res){
        try {   
            
            //PEGA AS INFORMAÇÕES DO PARAMS
            const { conversas } = req.params;
            
            //PEGA O CAMINHO DO ARQUIVO
            const filePath = path.join( __dirname, "../", "conversas", conversas + ".json");
            
            //LE O ARQUIVO
            const data = await fs.readFile( filePath, "utf8");

            //TRANSFORMA O ARQUIVO PARA OBJETO JS
            const json = JSON.parse(data)

            //RETORNA AS MENSAGENS DA CONVERSA
            return res.status(200).json({
                confirma:true,
                data: json.mensagens,
                erro: null
            })
        } catch (error) {
            return res.status(400).json({
                confirma:false,
                erro: error
            })
        }
    }
}