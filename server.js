import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js';
import Cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:XOxo999$@cluster0.fz4vk.mongodb.net/tinderdb?retryWrites=true&w=majority'




//middlewares
app.use(express.json());
app.use(Cors());


//db config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    
    useUnifiedTopology: true,
})

//api endpoints
app.get('/',(req,res) => res.status(200).send("This is the backend node server to host tindercards from a mongodb cluster, check the front-end part for the result."));

app.post("/tinder/cards", (req,res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
     if (err) {
        res.status(500).send(err)
      } else {
        res.status(201).send(data)
     }

    })

});


app.get("/tinder/cards", (req,res) => {
    

    Cards.find((err, data) => {
     if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
     }
     
    })

});




//listener
app.listen(port, () => console.log(`listening on : ${port}`));
