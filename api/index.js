

const express = require("express");
const app = express();
const path = require('path');
const Datastore = require('nedb');
//const product = require("./api/product");
//app.use(express.json({ limit: '1mb' }));

app.use(express.json({ extended: false }));
//app.use("/api/product", product);
//app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));


//app.get('/', (req, res) => {
//        res.sendFile('index.html', {root: path.join(__dirname, 'public')});
//        })
const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'))

//app.get('/', (req, res) => {
//        res.sendFile('index.html', {root: path.join(__dirname, 'public')});
//        })



app.get('/api', (request, response) => {
           console.log("here1");
           database.find({}, (err, data) => {

                         if (err) {
                         response.end();
                         return;
                         }
                         response.json(data);
                         });
           });
app.get('/api/scores/:user', (request, response) => {
           console.log("here2");
           let users  =  request.params.user;
           database.find({user:users}, (err, data) => {

                         if (err) {
                         response.end();
                         return;
                         }
                         response.json(data);
                         console.log(data);
                         });
           });

app.post('/api/a', (request, response) => {
            console.log("here3");
            const data = request.body;
            const timestamp = Date.now();
            data.timestamp = timestamp;
            if(data.update == true){
            database.update({ user: data.user}, { $set: { score: data.score } }, { multi: true }, function (err, numReplaced) {

                            });
            }else{
            database.insert(data);
            }
            response.json(data);

            });


const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
module.exports = app