const fs = require('fs');
const express = require('express');
//var dir = path.join(__dirname, 'public');
const app = express();

// Set EJS as templating engine 
app.set('view engine', 'ejs'); 

// setup the http port
const port = 1999;
const hostname = 'localhost';

app.listen(port, hostname, ()=>{
    console.log(`server is running on http://${hostname}:${port}`);
});


// serve the routes
app.get('/', (req, res) => {
    res.render('index')
});



app.use(express.static(__dirname + '/'));

// handle form requests
app.get('/send',(req,res)=>{

    const number = req.query.number;

    let file = "ttt.txt";

    fs.readFile(file, 'utf8', function (err, data) {

        if (err) throw err;
      
        var wordsArray = splitByWords(data);
        var wordsMap = createWordMap(wordsArray);
        var finalWordsArray = sortByCount(wordsMap,number);
      
        console.log(finalWordsArray);

        res.render("show",{ words: finalWordsArray })
    });
});

function splitByWords (text) {
    // split string by spaces (including spaces, tabs, and newlines)
    var wordsArray = text.split(/\s+/);
    return wordsArray;
  }
  
  
  function createWordMap (wordsArray) {
  
    // create map for word counts
    var wordsMap = {};
    /*
      wordsMap = {
        'what': 2,
        'random': 1,
        ...
      }
    */
    wordsArray.forEach(function (key) {
      if (wordsMap.hasOwnProperty(key)) {
        wordsMap[key]++;
      } else {
        wordsMap[key] = 1;
      }
    });
  
    return wordsMap;
  
  }
  
  
  function sortByCount (wordsMap,number) {
  
    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function(key) {
      return {
        name: key,
        total: wordsMap[key]
      };
    });
  
    finalWordsArray.sort(function(a, b) {
      return b.total - a.total;
    });
  
    var fixNArray = [];

    for(let i=0;i<number;i++){
        fixNArray[i]=finalWordsArray[i];
    }

    return fixNArray;
  
  }



  app.use(function(req,res){
    res.status(404).render('index');
  });