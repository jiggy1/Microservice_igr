const express = require('express');
const morgan = require('morgan');
const impotGeneralSurLeRevenu = require('./functions/impotGeneralRevenu');


const app = express();

const PORT = 8000;

// log request
app.use(morgan('tiny'));


const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017";

// parse request
app.use(express.urlencoded({extended: true}));

app.get('/:AS_ID', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
       if (err) throw err;
       var dbo = db.db("Microservice_igr");
       const AS_ID = parseInt(req.params.AS_ID);
       dbo.collection("assures").findOne({
           AS_ID: AS_ID
       },
       function(err, result) {
           if (err) throw err;

           if (result) {
               let {AS_NOM, MONTANT_BRUT, AS_ID} = result;
               
               let montant_igr = impotGeneralSurLeRevenu(AS_ID,MONTANT_BRUT, MONTANT_BRUT, montant_is, montant_cn);
               res.json({
                   'status': 200,
                   'result': {
                       'AS_ID': AS_ID,
                       'nom': AS_NOM,
                       'montant brut': MONTANT_BRUT,
                       'montant impot': montant_igr
                   }
               })
           } else {
               res.json({
                   'status': 404,
                   'result': null
               })
           }
           
           db.close();
       });
   });
});


app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`)
})
