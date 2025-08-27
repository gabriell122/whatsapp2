const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router()



//LISTA AS CONVERSAS DO USUARIO 
router.get( "/conversas", async (req, res)=>{

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
})

//ADICIONA UMA NOVA CONVERSA AO USUARIO
router.post( "/conversas", async (req, res)=>{
    try {
        // NOME DA NOVA CONVERSA
        const { nome } = req.body;

        // GERA O CAMINHO DO ARQUIVO
        const dirPath = path.join(__dirname, "..", "conversas" , nome + ".json");
        
        if (fs.existsSync(filePath)) 
            return res.status(409).json({
                confirma:false,
                data: "arquivo ja existente",
                erro: "arquivo ja existente"
            })

        // CRIA  O ARQUIVO
        fs.writeFile(dirPath, "" , (err) => {
            if (err) {
                console.error("Erro ao criar arquivo:", err);
                return res.status(200).json({
                    confirma:false,
                    data:"erro ao criar arquivo",
                    erro: err
                })
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
})

router.post("/mensagens", async ( req , res )=>{

    try {
        const {nome, mensagens} = req.body;
        const filePath = path.join(__dirname,"../", "conversas/" ,nome + ".json");
        // 1. Lê o conteúdo do arquivo
        let data = fs.readFileSync(filePath, "utf8");
        // 2. Converte para objeto JS
        let json = JSON.parse(data);
        // 3. Adiciona um item no array de mensagens
        json.mensagens.push({
        de: "gabriell",
        texto: mensagens,
        hora: new Date().toISOString()
        });

        // 4. Converte de volta para JSON string formatado
        let novoConteudo = JSON.stringify(json, null, 2);

        // 5. Salva no arquivo novamente
        fs.writeFileSync(filePath, novoConteudo, "utf8");

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


})


module.exports = router

const ExistFile = ({ fileName })=>{
    const filePath = path.join(__dirname, fileName);
    if (fs.existsSync(filePath)) {
        console.log("✅ O arquivo existe!");
        return true
    } else {
        CreateFile(fileName)
        return false
    }
}
const CreateFile = ({ fileName })=>{
    if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, "[]", "utf-8"); // cria com array vazio
    console.log("📂 Arquivo criado!");
    }   
}