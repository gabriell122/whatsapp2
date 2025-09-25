const fs = require("fs").promises;
const path = require("path");
const { default: ReadSync } = require("../utils/readSync");
const { default: SaveSync } = require("../utils/saveSync");
const { default: ExistsSync } = require("../utils/existSync");
const { default: DefaultFile } = require("../utils/defaultFile");

module.exports = {

    //REGISTRA AS MENSAGENS ENVIADAS PELO USUARIO PARA OUTRAS PESSOAS
    MensagensPost (req, res){
        try {
            
            //PEGA AS INFORMAÇÕES DO BODY
            const { conversas, mensagens} = req.body;
            
            //PEGA O CAMINO DO ARQUIVO
            const filePath = path.join( __dirname, "../", "conversas", conversas + ".json");

            if(ExistsSync({path: filePath})){
                //LE O ARQUIVO DA CONVERSA
                let data = ReadSync({path:filePath});
                if (!data) {
                    
                    return res.status(400).json({
                        confirma:false,
                        data: "erro ao ler arquivo",
                        erro: error
                    });
                }

                //ADICIONA A NOVA MENSAGEM
                data.mensagens.push({
                    de:"gabriell",
                    texto: mensagens,
                    hora: new Date().toISOString()
                })
                const resposta = SaveSync({data: data, path:filePath})
                //GRAVA AS AUTERAÇÕES
                if(!resposta){
                    return res.status(400).json({
                        confirma:false,
                        data: "erro ao salvar arquivo",
                        erro: error
                    });
                }
                //RETORNA SUSCESO
                return res.status(201).json({
                    confirma:true,
                    data: "create",
                    erro: null
                })
            }else{
                if(DefaultFile({path: filePath, data: mensagens, post: conversas})){
                    //RETORNA SUSCESO
                    return res.status(201).json({
                        confirma:true,
                        data: "create",
                        erro: null
                    })
                }else{
                    return res.status(400).json({
                        confirma:false,
                        data: "erro ao criar o arquivo base"
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
    MensagensGet ( req, res){
        try {   
            
            //PEGA AS INFORMAÇÕES DO PARAMS
            const { conversas } = req.params;
            
            //PEGA O CAMINHO DO ARQUIVO
            const filePath = path.join( __dirname, "../", "conversas", conversas + ".json");
            
            //LE O ARQUIVO
            const data = ReadSync({path:filePath})
            if (!data) {
                return res.status(400).json({
                    confirma:false,
                    data: "erro ao ler arquivo",
                    erro: error
                });
            }

            //RETORNA AS MENSAGENS DA CONVERSA
            return res.status(200).json({
                confirma:true,
                data: data.mensagens,
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