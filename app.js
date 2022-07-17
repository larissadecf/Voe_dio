var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const mongoose = require("mongoose");
mongoose.connet(process.env.MONGO_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
var db = mongoose.connection;

var indexRouter = require('./routes/index');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);

app.use("/availability", require("./routes/availabilityRoute"));
app.use("/reserve", require("./routes/reservationRoute"));

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", _=> {
        console.log("conectado com o banco");
    });

const sendMail = async(msg) =>{
    try{
      await sgMail.send(msg);
      console.log("Mensagem enviada com sucesso!");
    }catch(error){
     console.error(error.response.body);
     if(error.response){
        console.error(error.response.body);
     }
    }

};

sendMail({
    to:"larissadecassiaf@hotmail.com",
    from: "larissadecassiaf@hotmail.com",
    subject: "Confirmação do cadastro do sistema",
    text: "Parabéns você acaba de ser registrado no sistema voe Dio"
});


module.exports = app;
