"use strict";
var express = require('express');
var app = express()
var mongoose=require('mongoose');
var Sample = mongoose.model('Sample')


module.exports.samplecontroller = function(req, res){
res
 .render('sample');
}

//=============== ADDING CONTROLLER =========================

var _addService = function (req, res,doc) {

  var fname = req.body.fname;
  var lname= req.body.lname;
  var number = req.body.number;

   doc.name.push({
     firstname:fname,
     lastname:lname
   })
   doc.save(function(err, askUpdated) {
     if (err) {
       res
         .status(500)
         .json(err);
     } else {
       res.render('done');
     }
   });
 }

module.exports.addNumber = function(req, res){
  var fname = req.body.fname;
  var lname= req.body.lname;
  var number = req.body.number;;

  Sample.create({
    number:number
  },function(err,doc){
    console.log('number added, now adding up name')
     _addService(req,res,doc)
  })
};


//======================END OF ADDING CONTROLLER ============================




//=====================START OF UPDATING CONTROLLER============================


module.exports.updateNumber = function(req, res){
  var number= req.body.number;
  var lname= req.body.lname;
  var fname= req.body.fname;

  Sample
   .findOne({number:number})
   .select('name')
   .exec(function(err, doc){


       var x_id =doc.name[0]._id;

       var thisService = doc.name.id(x_id);

     thisService.firstname = fname;
     thisService.lastname= lname;


             doc.save(function(err, askUpdated) {
               if (err) {
                 res
                   .status(500)
                   .json(err);
               } else {
                 console.log("Document Updated")
                 res.render('done')
             };
})
})
}


//=====================START OF DELETING CONTROLLER============================

module.exports.deleteNumber = function(req, res){
var number= req.body.number;
var lname= req.body.lname;
var fname= req.body.fname;

Sample
.findOne({number:number})
.exec(function(err,doc){
doc.remove();
})
res.render('done')


}


//=====================END OF DELETING CONTROLLER=============================
