var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var index = require('./index.js');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');

// Setting EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// Rendering Homepage
app.get('/', function(req, res) {
    res.render('index');
    });

// Rendering Download page
app.post('/download', upload.single('csvfile'), function(req, res) {
    const apikey = req.body.apikey;
    const file = req.file.path;

    // Writing the CSV file
    var csvwrite = index.arrayFetch(apikey, file);
    if(csvwrite){
    res.render('download');
    // Clearing temp file
    deleteFile(req.file.path);
    }
});

// Final download
app.post('/downloadFile', function(req, res){
        res.download('emails.csv', function(err){
            deleteFile('emails.csv');
          });
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Server is running at http://localhost:4000');
  });

// Function to delete temp files
function deleteFile (file) { 
    fs.unlink(file, function (err) {
        if (err) {
            console.error(err.toString());
        } else {
            console.warn(file + ' deleted');
        }
    });
}