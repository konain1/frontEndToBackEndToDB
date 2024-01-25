
const express = require('express')
const app = express();

const path = require('path')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

const staticPath = path.join(__dirname , '/public')
app.use(express.static(staticPath)); 


app.post('/signup', (req, res) => {
    const username = req.body.username;
    const userEmail = req.body.email;
    res.send('Username received: ' + username + " " +' and the email is '+userEmail);
});
app.get('/',(req,res)=>{

    res.send('you are on get method ')
})

app.listen(4003)