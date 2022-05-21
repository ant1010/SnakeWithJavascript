

const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
        
        database.find({}, (err, data) => {
                     
                      if (err) {
                      response.end();
                      return;
                      }
                      response.json(data);
                      });
        });
app.get('/scores/:user', (request, response) => {
        let users  =  request.params.user;
        database.find({user:users}, (err, data) => {
                   
                      if (err) {
                      response.end();
                      return;
                      }
                      response.json(data);
                      //console.log(data);
                      });
        });

app.post('/api', (request, response) => {
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
module.exports = app;

//CLEARS DB
//database.remove({}, { multi: true }, function (err, numRemoved) {
//
//          });
