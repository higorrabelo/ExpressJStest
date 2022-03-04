const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas");
const port =8080;

connection.authenticate().then(()=>{
    console.log("Conexão Com o Banco de Dados Realizada")
})
.catch((msgErro)=>{
    console.log(msgErro);
});

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req,resp)=>{
    Pergunta.findAll({raw : true}).then((perguntas)=>{
        resp.render("index",{
            perguntas: perguntas
        });
    });
});

app.get("/perguntar",(req,resp)=>{
    resp.render("perguntar");
});

app.post("/salvarpergunta",(req,resp)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
            resp.redirect("/");
    });
});

app.listen(port,()=>{console.log("Servidor Rodando")});