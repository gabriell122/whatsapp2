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
const usuarios = require("../controlles/usuarios");
const router = express.Router()



//LISTA AS CONVERSAS DO USUARIO 
router.get( "/conversas", conversas.ConversasGet);

//ADICIONA UMA NOVA CONVERSA AO USUARIO
router.post( "/conversas", conversas.ConverasPost);

//LISTA AS MENSAGENS DE UMA CONVERSA
router.get("/mensagens/:conversas", mensagens.MensagensGet)

//GRAVA A MENSAGEM ENVIADA PELO USUARIO
router.post("/mensagens", mensagens.MensagensPost);

//LOGIN
router.post("/login", usuarios.Login);

//RESETA A CONTA
router.post("/reset", usuarios.Reset);

module.exports = router

