
const express = require('express')
const app = express();

const path = require('path')
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let token;
let jtwPassword;
let jtwEmail;

app.use(bodyParser.urlencoded({ extended: true }));

const staticPath = path.join(__dirname , '/public')
app.use(express.static(staticPath)); 


app.post('/signup', (req, res) => {
    const username = req.body.username;
    const userEmail = req.body.email;
    const password = req.body.password

    jtwPassword = password
    jtwEmail = userEmail
    token = jwt.sign({ email: userEmail }, password);



    res.send('Username received: ' + username + " " +' and the email is '+userEmail + " " + token);
});

app.post('/login', (req, res) => {
    const userEmail = req.body.loginemail;
    const password = req.body.password;
    if(userEmail == jtwEmail && jtwPassword == password){
        let decoded = jwt.verify(token, password);
        res.send(decoded.email + " you are varified")

    }else{

        res.status(403).json({msg:"email or password invalid"});
    }
   
});
app.get('/',(req,res)=>{

    res.send('you are on get method ')
})

app.listen(4003)