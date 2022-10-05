const mongoose = require('mongoose');
const Coach = require ('../schema/schemaCoach');
const User = require('../schema/schemaUser');
const passwordHash = require('password-hash')
//Get coach by id 
exports.getCoachById = function (req,res) {
    Coach.findById(req.params.id,function (err,coach) {
        if (err) {
            res.status(404).json({
                error: { errors: 
                        [{ domain: 'global',
                          reason: 'notFound',
                          message: 'Not Found', 
                          description: 'Couldn\'t find the requested coachId \'' + req.params.id + '\''
                         }],
                        err,
                        code: 404 }

            })
        } else {
            res.json(coach);
        }
    })
}

// Get all coachs 
exports.getAllCoachs = function (req, res) {
    res.header('Content-Range', 'coachs 0-20/20')
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    res.header('X-Total-Count',10)
    Coach.find(req.query, function(err, coachs) {
        if (err) {
            res.status(500).send(err);
        }
        else {            
            res.json(coachs);
        }
    });
}

// Create a new coach
exports.createCoach = function(req, res) {
    let newCoach = new Coach(req.body);
    newCoach.save(function(err, coach) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).json(coach);
      }
    });
    //register this coach as user with role 2
    let newTrainer = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : passwordHash.generate('12345678'),
        role : [2]
    })
    newTrainer.save();
  };
  
// Edit coach by Id 

exports.editCoachById = function (req,res) {
    Coach.findOneAndUpdate({
        _id: req.params.id
    },req.body, {new: false}, function(err, coach) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(coach);
        }
    });
}

exports.deleteCoach = function (req, res) {
    Coach.remove({
        _id : req.params.id
    }, function (err,coach){
     if (err) {
        res.status(404).json({
            error: { errors: 
                    [{ domain: 'global',
                       reason: 'notFound',
                       message: 'Not Found', 
                       description: 'Couldn\'t find the requested coachId \'' + req.params.id + '\''
                     }],
                    err,
                    code: 404 }
        });
     } else {
        res.status(204).json({message: 'coach successfully deleted'});
     }   
    })
}