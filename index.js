const express = require('express');
const app = express();
const routers = require("./routes/index")
let cors = require("cors");

app.use(cors());
app.use(express.json());
const port = 5000;


app.use("/", routers);

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});