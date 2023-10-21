const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require("cors");

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(bodyParser.json());

app.use('/', routes);

app.use(express.static('public'));

app.get('/api/csv-data', (req, res) => {
    try {
        
   
    const csvFilePath = path.join(__dirname, 'public', 'export29913.csv'); // Adjust the file path as needed
  console.log(csvFilePath,"csv")
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) =>{
     // Create a new object with cleaned keys
     const cleanedData = {};

     for (const key in data) {
         if (Object.hasOwnProperty.call(data, key) && key !== '') {
             const newKey = key.replace(/ /g, ''); // Remove spaces in keys
             cleanedData[newKey] = data[key];
         }
     }
      
      results.push(cleanedData)
    })
      .on('end', () => {
        res.json(results);
      });
    } catch (error) {
        console.log(error,"err")
    }
  });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});