var csvsync = require('csvsync');
var fs = require('fs');
const request = require('request');

// Initializing array
var email_array = [];

async function arrayFetch(apikey, file) {
    
    email_array =[];
    // Reading user's CSV
    var csv = fs.readFileSync(file);
    var data = csvsync.parse(csv);

    // Iterating through companies
    data.forEach(element => {
        request('https://api.hunter.io/v2/domain-search?company=' + element +'&api_key='+apikey+'&limit=2&type=personal', (err, res, body) => {
            if (err) reject(err)
            mainbody = JSON.parse(body);
            mainbody.data.emails.forEach(function (key) {
                if (key.value) {
                        email_array.push([[mainbody.data.organization, key.value, key.first_name, key.position]]);
                        var csvwrite = csvsync.stringify(email_array);
                        fs.writeFileSync('emails.csv', csvwrite);
                        return csvwrite;      
                }
            });
        });
    });
}

module.exports = { arrayFetch };