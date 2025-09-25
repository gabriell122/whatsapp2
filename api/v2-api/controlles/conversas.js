const fs = require("fs");
const path = require("path");
const { default: ExistsSync } = require("../utils/existSync");
const { default: DefaultFile } = require("../utils/defaultFile");

module.exports = {
    async ConversasGet (req, res) {
        try {
            // CAMINHO DA PASTA DAS CONVERSAS
            const dirPath = path.join(__dirname, "..", "conversas");

            // LISTA ARQUIVOS DA PASTA
            const arquivos = fs.readdirSync(dirPath);
            
            // REMOVE A EXTENSÃO DE CADA ARQUIVO
            const filesName = arquivos.map(arq => path.parse(arq).name);

            // RETORNO DA API
            return res.status(200).json({
                confirma: true,
                data: filesName,
                erro: null
            });
        } catch (error) {
            return res.status(400).json({
                confirma:false,
                erro: error
            })
        }
    },
    async ConverasPost (req, res) {
        try {
            // NOME DA NOVA CONVERSA
            const { conversas } = req.body;

            if(!conversas){
                //CAMPO NULO
                return response.status(400).json({
                    confirma: false,
                    message: "campo nulo",
                })
            }
            
            // GERA O CAMINHO DO ARQUIVO
            const filePath = path.join(__dirname, "..", "conversas" , conversas + ".json");
            
            if (ExistsSync({path:filePath})){
                return res.status(409).json({
                    confirma:false,
                    data: "arquivo ja existente",
                    erro: "arquivo ja existente"
                })
            }
            
            //CRIA CONVERSA VAZIA
            DefaultFile({path:filePath, post:conversas})

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
    }
}