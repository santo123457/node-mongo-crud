const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID
const uri = "mongodb+srv://mdsanto:santoboss33@gmail.com@cluster0.zhghr.mongodb.net/TheTopTheme?retryWrites=true&w=majority";

const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("TheTopTheme").collection("mongoPractice");
  
  app.get('/product', (req,res)=>{
     collection.find({})
     .toArray((err,documents)=>{
       res.send(documents)
     })
  
  })
    app.post("/addProduct",(req , res)=>{
      const Product = req.body;
      collection.insertOne( Product)
      .then(result =>{
        console.log("data added Successfully");
        res.send("Your Data has sent to database successfully")
      })
    })
    
    app.delete("/delete/:id",(req,res)=>{
      collection.deleteOne({ 
        _id: ObjectId(req.params.id)
      })
      .then(function(result) {
        console.log(result);
      })
    })
    
    app.get('/singleProduct/:id',(req,res)=>{
      collection.find({_id : ObjectId(req.params.id)})
      .toArray((err,documents)=>
      {
        res.send(documents[0])
      })
    })
    app.patch('/update/:id',(req,res)=>{
      console.log(req.body);
      collection.updateOne({_id:ObjectId(req.params.id)},
      {
         $set: { price:req.body.price, quantity: req.body.quantity }
      })
      .then(result=>{
        res.send({property:"successfully Updated"})
      })
    })
 
});
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")

})

app.listen(3000);