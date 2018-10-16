"use strict";
var express = require('express');
var app = express()
var router = express.Router();
module.exports = router;
var ctrlServices = require('../controllers/services.controllers.js');
var mongoose=require('mongoose');
var Sample= mongoose.model('Sample')


//Simple hbs rendering here itself
router.get('/',function(req,res,next){
  res.render('index');
})

//handling renderings
router.get('/addnumber',function(req,res,next){
  res.render('add');
})

router.get('/updateNumber',function(req,res,next){
  res.render('update');
})

router.get('/deleteNumber',function(req,res,next){
  res.render('delete');
})

//Sending over to controller to render there
router
  .route('/sample')
  .get(ctrlServices.samplecontroller)

//adding a number to database

router
 .route('/addnumber')
 .post(ctrlServices.addNumber)

 //Updating to database

 router
  .route('/updateNumber')
  .post(ctrlServices.updateNumber)


  //Deleting in database
  router
   .route('/deleteNumber')
   .post(ctrlServices.deleteNumber)
