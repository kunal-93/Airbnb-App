const isAuthenticated = (req, res, next) => {
    
    if(req.session.userInfo){
        next();
    }
    else{
        req.session.redirectTo = req.originalUrl;
        res.redirect("/user/login");
    }
}

const isAdmin = (req, res, next) => {
    
    if(req.session.userInfo && req.session.userInfo.isAdmin){
        next();
    }
    else{
        req.session.redirectTo = req.originalUrl;
        res.redirect("/user/login");
    }
}

module.exports.isAuthenticated = isAuthenticated;
module.exports.isAdmin = isAdmin;