

const express = require("express");
const app = express();
const path = require('path');
const Datastore = require('nedb');
//const product = require("./api/product");
//app.use(express.json({ limit: '1mb' }));

//app.use(express.json({ extended: false }));
//app.use("/api/product", product);
//app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));


//app.get('/', (req, res) => {
//        res.sendFile('index.html', {root: path.join(__dirname, 'public')});
//        })
const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'))

app.get('/', (req, res) => {
        res.sendFile('index.html', {root: path.join(__dirname, 'public')});
        })

app.get('/p', (request, response) => {
                   console.log("here1");
        try {
        response.json({
                 status: 200,
                 message: "Get data has successfully",
                 });
        } catch (error) {
        console.error(error);
        return response.status(500).send("Server error");
        }
                   });


app.listen(process.env.PORT || 3000);

module.exports = app;


