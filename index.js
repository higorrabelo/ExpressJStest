const express = require("express");
const App = express();

App.get("/",function(req,resp){
    resp.send("<h1>Primeira Página</h1>");
});

App.get("/quemsomos/:nome?",function(req,resp){
    var nome = req.params.nome;
    if(nome){
        resp.send("<h1>Quem Somos e o que podemos fazer por sua empresa</h1>"+nome);
    }else{
        resp.send("<h1>Quem Somos e o que podemos fazer por sua empresa</h1>");
    }
    
});

App.get("/contato",function(req,resp){
    resp.send("<h1>Nosso Contato</h1>");
})

App.listen(8080,function(erro){
    if(erro){
        console.log("Erro no Carregamento do Servidor");
    }else{
        console.log("Serivor On Line");
    }
});