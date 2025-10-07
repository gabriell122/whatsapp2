const express = require("express");
const fs = require("fs");
const path = require("path");
const mensagens = require("../controlles/mensagens");
const conversas = require("../controlles/conversas");
const { default: ReadSync } = require("../utils/readSync");
const { default: SaveSync } = require("../utils/saveSync");
const { default: ExistsSync } = require("../utils/existSync");
const { GerarHash, VerificarSenha } = require("../utils/bcrypt");
const { GerarToken } = require("../utils/jwt");
const router = express.Router()



//LISTA AS CONVERSAS DO USUARIO 
router.get( "/conversas", conversas.ConversasGet);

//ADICIONA UMA NOVA CONVERSA AO USUARIO
router.post( "/conversas", conversas.ConverasPost)


router.post("/mensagens", mensagens.MensagensPost)
router.get("/mensagens/:conversas", mensagens.MensagensGet)

router.post("/login", (req, res) =>{
    try {
        const { user, password } = req.body;
        const filePath = path.join( __dirname ,"../configs/user.json")
        const fileData = ReadSync({path:filePath})
        if(!fileData){
            //ERRO AO LER ARQUIVO
            return res.status(400).json({
                confirma:false,
                data: "erro ao ler arquivo",
                erro: error
            });
        }else{
            const resp = VerificarSenha({password: password, hash:fileData.password})
            if(resp){
                const token = GerarToken({ user: { nome: user } });
                
                //RETORNA AS MENSAGENS DA CONVERSA
                return res.status(200).json({
                    confirma:true,
                    data: {
                        user:user,
                        token:token
                    },
                    erro: null
                })
            }else{
                return res.status(400).json({
                    data: "Senha Incoreta",
                    confirma:false,
                })
            }
            
        }
            
    } catch (error) {
        return res.status(400).json({
            confirma:false,
            erro: error
        })
    }
})

router.post("/reset", (req, res)=>{
    try {
        const { user, password } = req.body;
        //VERIFICA SE OS DADOS EXISTE
        if (!(user && password)) {
            return response.status(400).json({
                confirma: false,
                message: "campo nulo",
            })
        }
        const filePath = path.join( __dirname ,"../configs/user.json")
        const dirPath = path.join( __dirname, "../conversas")
        if (ExistsSync({path:filePath})) {
            fs.unlinkSync(filePath)
        }
        fs.rmSync(dirPath,{recursive:true, force:true})
        fs.mkdirSync(dirPath)
        const hash = GerarHash({password: password})
        SaveSync({path: filePath, data:{
            "user": user,
            "password": hash
        }})
        return res.status(200).json({
            confirma:true,
            data: "resetado com susceso",
            error: null
        })
    } catch (error) {
        return res.status(400).json({
            confirma:false,
            erro: error
        })
    }
})

module.exports = router

/*

try {
        const {user, password} = req.body;
        //VERIFICO SE OS CAMPOS OBGATORIOS EXISTEM
        if (!(user && password)) {
            //CAMPO NULO
            return response.status(400).json({
                confirma: false,
                message: "campo nulo",
            })
        }
        //VERIFICO SE AS CONFIGS JA EXISTEM
        const filePath = path.join( __dirname ,"../configs/user.json")
        console.log(ExistsSync({path:filePath}));
        
        //SE EXISTIR APAGO AS CONVERSAS
        if(ExistsSync({path:filePath})){
            const dirPath = path.join( __dirname, "../conversas")
            fs.unlinkSync(filePath)
            fs.rmSync(dirPath,{recursive:true, force:true})
            fs.mkdirSync(dirPath)
            console.log(dirPath);
            
        }else{
            SaveSync({path: filePath, data:{
                "user": user,
                "password": password
            }})
            // RETORNO DA API
            return res.status(201).json({
                confirma: true,
                data: "create",
                erro: null
            });
        }
        // SaveSync({path: filePath, data:{
        //     "user": user,
        //     "password": password
        // }})
        return res.status(400).json({
            null:null
        })
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({
            confirma:false,
            erro: error
        })  
    }
*/