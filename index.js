const express = require("express");
const app = express();

var port =8080;

app.set('view engine','ejs');

app.get("/:nome?/:lang?",(req,resp)=>{
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome:"Guitarra",preco:3000},
        {nome:"Baixo",preco:2000},
        {nome:"Microfone",preco:1000},
        {nome:"Bateria",preco:5000}
    ];

    resp.render("index",{
        nome: nome,
        lang: lang,
        empresa: "Higor Inc",
        inscritos: 8000,
        msg: exibirMsg,
        produtos : produtos
    });
});

app.get("/home",function(req,resp){
    resp.render("home");
});

app.get("/perfil",function(req,resp){
    resp.render("principal/perfil");
});

app.listen(port,()=>{console.log("Servidor Rodando")});