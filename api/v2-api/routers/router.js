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