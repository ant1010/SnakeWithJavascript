

const express = require("express");
const app = express();
const product = require("./api/product");
//app.use(express.json({ limit: '1mb' }));

app.use(express.json({ extended: false }));
app.use("/api/product", product);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

//app.get('/', (req, res) => {
//        res.sendFile('index.html', {root: path.join(__dirname, 'public')});
//        })
//
//
//
//module.exports = app;
