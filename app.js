const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let state = {
  id: "waiting",
  transactionhash: ""
};

app.get("/", (req, res) => {
 
  console.log("recibido");

  res.send(state);
  console.log(state);
  if(state.id !== "waiting"){
    state.id = "waiting";
    state.transactionhash = ""
  }
  
});

app.post("/", (req, res) => {

  if (req.body.pass === "706173737730726421773077536f6c316d346e212138") {
    console.log("Autorized");
    res.send({pass: "yes"});

    setTimeout(() => {
      state.id = "1";
      state.transactionhash = "0x88d99a6530714c8790ae3ff22ca81d59f75648172b0fa72e3ec6cac370afa71d"
      console.log("end waiting for transaction");
    }, 20000);

  }else{
    res.send({pass: "No autorizado"});
  }
});

server.listen(3000, () => console.log("Server running on port 3000..."));
