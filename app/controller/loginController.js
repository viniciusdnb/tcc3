const msgSession = require('../libs/msgSession');
module.exports = {
    index: function(req, res){
        
        res.render('login/index', {
            fileName: 'main', 
            msgError: msgSession.getMsgError(req),
            msgSuccess: msgSession.getMsgSuccess(req)
        });

        msgSession.cleanMsgError(req);
        msgSession.cleanMsgSuccess(req);
       
    }
}