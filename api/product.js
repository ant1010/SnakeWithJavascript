

const express = require('express');
const Datastore = require('nedb');
const path = require('path');
const router = express.Router();
//app.listen(3000, () => console.log('listening at 3000'));

const database = new Datastore('database.db');
database.loadDatabase();

router.get('/p', (request, response) => {
        console.log("here1");
        database.find({}, (err, data) => {

                      if (err) {
                      response.end();
                      return;
                      }
                      response.json(data);
                      });
        });
router.get('/scores/:user', (request, response) => {
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

router.post('/a', (request, response) => {
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
//router.use(express.static('/public'))
//router.get('/', (req, res) => {
//           res.sendFile('index.html', {root: path.join(__dirname, 'public')});
//           })
module.exports = router;

//CLEARS DB
//database.remove({}, { multi: true }, function (err, numRemoved) {
//
//          });
//const express = require("express");
//const router = express.Router();
//router.use(express.static('public'));
///**
// * GET product list.
// *
// * @return product list | empty.
// */
//app.get("/", async (req, res) => {
//           try {
//           res.json({
//                    status: 200,
//                    message: "Get data has successfully",
//                    });
//           } catch (error) {
//           console.error(error);
//           return res.status(500).send("Server error");
//           }
//           });
//
//module.exports = app;
