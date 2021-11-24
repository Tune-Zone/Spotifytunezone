const express = require('express')
const cors = require('cors')
const spotifyWebApi = require('spotify-web-api-node')
const mongoose = require('mongoose');
const Tune = require('./Model/Tunepost')

const app = express()
const port = process.env.PORT || 5000

app.use(cors()) // To handle cross-origin requests
app.use(express.json()); // To parse JSON bodies

const credentials = {
  clientId: "fdcf5760de4a46f7a825ae4e1bc4a8ba",
  clientSecret: "80468b196e954b8fb1cc0bacef4a78f2",
  redirectUri: "http://localhost:3000"
};

app.get('/', (req, res) => {
  console.log('Hello World!')
})

app.post('/login', (req,res) => {
//  setup 
    let spotifyApi = new spotifyWebApi(credentials)

//  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
    const code = req.body.code

    // Retrieve an access token
    spotifyApi.authorizationCodeGrant(code).then((data) => {

        // Returning the User's AccessToken in the json formate  
        res.json({
            accessToken : data.body.access_token,
        }) 
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(400)
    })

})

//db

mongoose.connect("mongodb+srv://Harish:spotify123@cluster0.ibbjy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB connected'))

mongoose.connection.on('error',err => {
  console.log(`DB connection error: ${err.message}`);
});

app.get('/getremix', function(req,res) {
    const tunes = Tune.find()
    .then((tunes)=>{
        res.json(tunes)
    })
})

app.post('/createremix', function(req, res) {
    console.log(req)
    const remix = {
      title: req.body.title,
      body: req.body.body,
      track: req.body.track,
      artist: req.body.artist,
      description: req.body.description
    };

    var newtune = new Tune(remix)

    newtune.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result);
            res.json(result);
        }
    })

});

app.get('/yo',(req,res)=> {
    res.json({"h":"k"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})