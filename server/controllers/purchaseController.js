const mongoose = require('mongoose');
const Purchase = require("../schema/schemaPurchase");

exports.getPurchase = function(req,res) {
    req.query['status'] = 'UNPAID'; 
    Purchase.find(req.query, function(err, basket) {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.status(200).json(basket)
            console.log(basket)
        }
    })  
}

exports.addPurchase = function (req, res) {
    Purchase.find({purchase : req.body.purchase, owner: req.body.owner}, function(err,purchase){
            if (err){
                req.status(500).json({message: "There is an error"});
            }
        })
    }
    

exports.removePurchase = function (req, res) { 
     Purchase.remove({
        _id: req.params.id
     },function(err, purchase){
        if (err) {
            res.status(500).json({message: "There is an error! Be carefull !"})
        } else {
            res.status(204).json({message: 'Purchase successufully deleted'})
        }
     })
}

exports.getTotal = function (req, res) {
    console.log({status: 'UNPAID', owner: req.query.username})
    Purchase.find({status: 'UNPAID', owner: req.query.username}, function(err,purchases){
        if (err) {
            res.status(500).json({message: "There is an error! Be carefull !"})
        } else {
            let total = 0
            purchases?.forEach((element) => {
                total += element?.price
            })
            res.status(200).json({total: total})
        }
    })
}