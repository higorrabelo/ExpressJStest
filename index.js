const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas");
const port =8080;
const func = ()=>{console.log("Servidor Rodando")};
const Respsota = require("./database/Resposta");
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({raw : true, order:[
        ['id','DESC']
    ]}).then((perguntas)=>{
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

app.get("/pergunta/:id",(req,resp)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta=>{
        if(pergunta!=undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id','desc']]
            }).then(respostas => {
                resp.render("pergunta",{
                pergunta: pergunta,
                respostas: respostas
                });
            });
        }else{
            resp.redirect("/");
        }
    });
});

app.post("/responder",(req,resp)=>{
    var perguntaId = req.body.perguntaId;
    var corpo = req.body.corpo;
     Resposta.create({
        perguntaId: perguntaId,
        corpo: corpo 
    }).then(()=>{
        resp.redirect("/pergunta/"+perguntaId);
    });  
});

app.listen(port,func);