const isAuthenticated = (req, res, next) => {
    
    if(req.session.userInfo){
        next();
    }
    else{
        res.redirect("/user/login");
    }
}

const isAdmin = (req, res, next) => {
    
    if(req.session.userInfo && req.session.userInfo.isAdmin){
        next();
    }
    else{
        res.redirect("/user/login");
    }
}

module.exports.isAuthenticated = isAuthenticated;
module.exports.isAdmin = isAdmin;