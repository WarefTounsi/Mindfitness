const mongoose = require('mongoose');
const Purchase = require("../schema/schemaPurchase");

exports.getPurchase = function(req,res) {
    Purchase.find(req.query, function(err, basket) {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.status(200).json(basket)
        }
    })  
}

exports.addPurchase = function (req, res) {
    console.log(req.body)
    const purchase = new Purchase(req.body)
    purchase.save(function(err,purchase){
        if (err) {
            return res.status(500).send(err.message)
        } else {
            return res.status(200).json(purchase)
        }
    })

}

exports.removePurchase = function (req, res) { 
     purchase.remove({
        _id: req.params.id
     },function(err, purchase){
        if (err) {
            console.log(err)
        } else {
            res.status(204).json({messsage: 'Purchase successufully deleted'})
        }
     })
}