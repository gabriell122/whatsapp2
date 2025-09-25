const express = require("express");
const fs = require("fs");
const path = require("path");
const mensagens = require("../controlles/mensagens");
const conversas = require("../controlles/conversas");
const router = express.Router()



//LISTA AS CONVERSAS DO USUARIO 
router.get( "/conversas", conversas.ConversasGet);

//ADICIONA UMA NOVA CONVERSA AO USUARIO
router.post( "/conversas", conversas.ConverasPost)


router.post("/mensagens", mensagens.MensagensPost)
router.get("/mensagens/:conversas", mensagens.MensagensGet)

module.exports = router

// const ExistFile = ({ fileName })=>{
//     const filePath = path.join(__dirname, fileName);
//     if (fs.existsSync(filePath)) {
//         console.log("✅ O arquivo existe!");
//         return true
//     } else {
//         CreateFile(fileName)
//         return false
//     }
// }
// const CreateFile = ({ fileName })=>{
//     if (!fs.existsSync(fileName)) {
//     fs.writeFileSync(fileName, "[]", "utf-8"); // cria com array vazio
//     console.log("📂 Arquivo criado!");
//     }   
// }

// router.get("/mensagens/:nome", async ( req, res)=>{
//     try {
//         const {nome} = req.params;
//         const filePath = path.join(__dirname,"../", "conversas/" ,nome + ".json");
//         // 1. Lê o conteúdo do arquivo
//         let data = fs.readFileSync(filePath, "utf8");
//         // 2. Converte para objeto JS
//         let json = JSON.parse(data);
//         return res.status(200).json({
//             confirma:true,
//             data: json.mensagens,
//             erro: null
//         })
//     } catch (error) {
//         return res.status(400).json({
//             confirma:false,
//             erro: error
//         })
//     }
// })

// router.post("/mensagens", async ( req , res )=>{

//     try {
//         const {nome, mensagens} = req.body;
//         const filePath = path.join(__dirname,"../", "conversas/" ,nome + ".json");
//         // 1. Lê o conteúdo do arquivo
//         let data = fs.readFileSync(filePath, "utf8");
//         // 2. Converte para objeto JS
//         let json = JSON.parse(data);
//         // 3. Adiciona um item no array de mensagens
//         json.mensagens.push({
//         de: "gabriell",
//         texto: mensagens,
//         hora: new Date().toISOString()
//         });

//         // 4. Converte de volta para JSON string formatado
//         let novoConteudo = JSON.stringify(json, null, 2);

//         // 5. Salva no arquivo novamente
//         fs.writeFileSync(filePath, novoConteudo, "utf8");

//         return res.status(201).json({
//             confirma:true,
//             data: "create",
//             erro: null
//         })

//     } catch (error) {
//         return res.status(400).json({
//             confirma:false,
//             erro: error
//         })
//     }


// })