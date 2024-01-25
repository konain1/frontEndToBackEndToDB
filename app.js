
const express = require('express')
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://konain7:Kaunain%4099@cluster0.rmyvhx6.mongodb.net/facebookpage');

const fbUsers = mongoose.model('fbID', { name: String , email:String,password:String,uniqueId:String });


const path = require('path')
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let token;
let jtwPassword;
let jtwEmail;

app.use(bodyParser.urlencoded({ extended: true }));

const staticPath = path.join(__dirname , '/public')
app.use(express.static(staticPath)); 


app.post('/signup', async function (req, res){
    const username = req.body.username;
    const userEmail = req.body.email;
    const password = req.body.password

    jtwPassword = password
    jtwEmail = userEmail
    token = jwt.sign({ email: userEmail }, password);


    const existingUser = await fbUsers.findOne({ email: userEmail });
    // console.log(existingUser)

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }
    const fbguy = new fbUsers({ name: username,email:userEmail,password:password,uniqueId:token });
    fbguy.save().then(() => console.log('new user added'));

    res.send('Username received: ' + username + " " +' and the email is '+userEmail + " " + token);
});

app.post('/login',(req, res) => {
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