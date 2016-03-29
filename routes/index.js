var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var params = require('params');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/quest1', function(req, res, next) {
  res.render('quest1', { title: 'Express' });
});
router.get('/quest2', function(req, res, next) {
  res.render('quest2', { title: 'Express' });
});
router.get('/quest3', function(req, res, next) {
  res.render('quest3', { title: 'Express' });
});
router.get('/quest4', function(req, res, next) {
  res.render('quest4', { title: 'Express' });
});
router.get('/quest5', function(req, res, next) {
  res.render('quest5', { title: 'Express' });
});


router.get("/jokes",function(req,res){
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/test";

  MongoClient.connect(url,function(err,db){
    if(err){
      console.log("cant connect")
    }
    else{
      console.log("you are connected")

      var collection = db.collection("jokes");

      collection.find({}).toArray(function(err,result){
        if(err){
          res.send(err)
        }else if(result.length){

          res.render('jokeslist', {jokeslist : result });
        }else{
          res.send("dont look here")
        };
        db.close();

      })
    }
  })
})

router.get("/newjoke",function(req,res){

  res.render("newjoke",{title: "add joke"})
});

router.post("/addjoke",function(req,res){

  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/test";

  MongoClient.connect(url,function(err,db){
    if(err){
      console.log("err in post" + err)
    }else {
      console.log("post connected")
    }
    var collection = db.collection("jokes")
    var addjoke = {joke:req.body.joke}
    collection.insert([addjoke],function(err,db){
        if(err){
          console.log("cant save joke in db")
        }else{
          res.redirect("jokes");
        };
        db.close;
    });
  });
});


router.delete("/jokes/:id",function(req,res){

  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/test";

  MongoClient.connect(url,function(err,db){
    if(err){
      console.log("err in delete")
    }
    else{
      console.log("you are connected")
    }
    var collectiong = db.collection("jokes");
    collectiong.remove({_id:"req.params.id"}),function(err,db){
      if(err){console.log("cant delete")}
      else{console.log("its deleted")}
    };
    db.close;
  });

});

module.exports = router;
