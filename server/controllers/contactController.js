const message = require('../schema/schemaContact');

//get All messages

exports.getAllMessages = function (req, res) {
    res.header('Content-Range', 'coachs 0-20/20')
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    res.header('X-Total-Count',10)

    message.find({}, function (err, messages) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(messages)
        }

    })
}

// create a new message

exports.createMessage = function (req, res) {
  let newMessage = new message(req.body);
  newMessage.save(function (err, message) {
    if (err) {
        res.status(500).send('Veuillez Réssayez ultérieurement');
    }else {
        res.status(201).send('Votre message a été envoyé avec succèes')
    }
  })    
}