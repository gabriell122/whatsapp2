const fs = require("fs");
const path = require("path");
const { default: ReadSync } = require("../utils/readSync");
const { default: SaveSync } = require("../utils/saveSync");
const { default: ExistsSync } = require("../utils/existSync");
const { GerarToken } = require("../utils/jwt");
const { VerificarSenha, GerarHash } = require("../utils/bcrypt");

module.exports = {
    Login (req, res) {
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
    },
    Reset (req, res) {
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
        console.log(password);
        
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
        console.log(error);
        
        return res.status(400).json({
            confirma:false,
            erro: error
        })
    }
}
}