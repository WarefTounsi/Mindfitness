const partner = require('../schema/schemaPartner');

exports.addPartner = function (req, res) {
    let newPartner = new partner(req.body)
    newPartner.save(function(err, partner){
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(partner)
        }   
    })
}
exports.getAllPartners = function (req, res) {
    res.header('Content-Range', 'partners 0-20/20')
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    res.header('X-Total-Count',10)
    partner.find({}, function(err, partners){
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(partners);
        }
    }) 
}

exports.deletePartner = function (req, res) {
    partner.remove({
        _id : req.params.id
    },function(err, partner) {
        if (err) {
            res.status(404).json({
                error: { errors: 
                        [{ domain: 'global',
                          reason: 'notFound',
                          message: 'Not Found', 
                          description: 'Couldn\'t find the requested PartnerId \'' + req.params.id + '\''
                         }],
                        err,
                        code: 404 }
            });
         } else {
            res.status(204).json({message: 'Partner successfully deleted'});
         }   
    })
}