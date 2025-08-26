const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router()


router.get( "/conversas", (req, res)=>{
    const dirPath = path.join(__dirname, "..", "conversas");
    // fs.readdirSync()
    // lê todos os arquivos dentro da pasta
    const arquivos = fs.readdirSync(dirPath);
    return res.status(200).json({
        confirma:true,
        data: arquivos,
        erro: null
    })
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