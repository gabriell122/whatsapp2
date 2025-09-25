const fs = require("fs").promises;
const path = require("path");
const { default: ExistsSync } = require("../utils/existSync");
const { default: DefaultFile } = require("../utils/defaultFile");

module.exports = {
    async ConversasGet (req, res) {
        try {
            // CAMINHO DA PASTA DAS CONVERSAS
            const dirPath = path.join(__dirname, "..", "conversas");
            console.log("a");

            // VERIFICA SE A PASTA EXISTE
            if (!fs.existsSync(dirPath)) {
                throw new Error("Diretório não encontrado: " + dirPath);
            }

            // LISTA ARQUIVOS DA PASTA
            const arquivos = fs.readdirSync(dirPath);
            console.log("b");

            // REMOVE A EXTENSÃO DE CADA ARQUIVO
            const nomes = arquivos.map(arq => path.parse(arq).name);
            console.log("c");

            // RETORNO DA API
            return res.status(200).json({
                confirma: true,
                data: nomes,
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
            console.log(conversas);
            
            // GERA O CAMINHO DO ARQUIVO
            const filePath = path.join(__dirname, "..", "conversas" , conversas + ".json");
            console.log(filePath);
            
            if (ExistsSync({path:filePath})){
                return res.status(409).json({
                    confirma:false,
                    data: "arquivo ja existente",
                    erro: "arquivo ja existente"
                })
            }
    
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