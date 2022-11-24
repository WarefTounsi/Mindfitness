import Cart from "../models/cart.js"

export const addToCart = function(req,res) {
    const cart = new Cart(req.body);
    cart.save(function(err,cart) {
        if (err) {
            res.status(500).json({message: err.message})            
        } else {
            res.status(201).json(cart)
        }
    })
}

export const getCarts = function(req,res) {
    Cart.find(req.body, function(err,cart) {
        if (err) {
            return res.status(500).json({message: err.message})
        } else {
            return res.status(200).json(cart)
        }
    })
}

export const deleteCart = function(req,res) {
    Cart.remove({
        _id: req.params.id
    }, function(err,cart) {
        if (err) {
            return res.status(500).json({message: err.message})
        } else {
            return res.status(202)
        }
    })
}   