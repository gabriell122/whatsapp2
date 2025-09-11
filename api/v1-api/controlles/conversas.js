const fs = require("fs").promises;
const path = require("path");

module.exports = {
    async ConversasGet (req, res) {
        try {
            //GERRA O CAMINHO DAS CONVERSAS
            const dirPath = path.join(__dirname, "..", "conversas");
    
            //RETORNA UMA LISTA DOS ARQUIVOS DENTRO DO DIRETORIO    
            const arquivos = fs.readdirSync(dirPath);
    
            //TIRA A EXTENCAO DO ARQUIVO
            const nomes = arquivos.map(arq => path.parse(arq).name);
    
            return res.status(200).json({
                confirma:true,
                data: nomes,
                erro: null
            })
        } catch (error) {
            return res.status(400).json({
                confirma:false,
                erro: error
            })
        }
    },
    async ConverassPost (req, res) {
        try {
            // NOME DA NOVA CONVERSA
            const { conversas } = req.body;
    
            // GERA O CAMINHO DO ARQUIVO
            const dirPath = path.join(__dirname, "..", "conversas" , conversas + ".json");
            
            if (fs.existsSync(dirPath)){
                return res.status(409).json({
                    confirma:false,
                    data: "arquivo ja existente",
                    erro: "arquivo ja existente"
                })
            }
    
            // CONTEÚDO PADRÃO
            const conteudoPadrao = {
                nome: conversas,       // usa o nome que veio no body
                status: "online", // status inicial
                mensagens: []     // array vazio
            };
    
            // CRIA  O ARQUIVO
            fs.writeFile(dirPath, JSON.stringify(conteudoPadrao, null, 2), (err) => {
                if (err) {
                    console.error("Erro ao criar arquivo:", err);
                    return res.status(500).json({
                        confirma: false,
                        data: "erro ao criar arquivo",
                        erro: err
                    });
                } else {
                    console.log("Arquivo criado com sucesso!");
                }
            });
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