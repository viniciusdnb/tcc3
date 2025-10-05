module.exports = {
    index:function(req, res){
        res.render('aventura-pet/index', {fileName: 'main'});
    },
    addPetPage: function(req, res){
        
        res.render('aventura-pet/index', {fileName:'add-pet'});
    }
}