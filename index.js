const express = require("express");
const app = express();
const bodyParser = require("body-parser");

var port =8080;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extend:false}));
app.use.apply(bodyParser.json());

app.get("/",(req,resp)=>{
    resp.render("index");
});

app.get("/perguntar",(req,resp)=>{
    resp.render("perguntar");
});

app.post("/salvarpergunta",(req,resp)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    resp.send("Formulário Recebido");
});

app.listen(port,()=>{console.log("Servidor Rodando")});