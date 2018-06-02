var db = require("../models");
var passport = require("../config/passport");
const express = require('express');
const router = express.Router();
let loginStatus = {
    loggedIn: false,
    loggedOut: true
}

router.get("/", (req, res) => {
    if(req.isAuthenticated()){
        console.log('we got you');
        loginStatus.loggedIn = true;
        loginStatus.loggedOut = false;
        res.render("home", loginStatus);
    }
    else {
        console.log('nuh uh');
        loginStatus.loggedIn = false;
        loginStatus.loggedOut = true;
        res.render("home", loginStatus);
    }
    });


//create bike
router.post('/api/bikes', (req, res) => {
    db.Bikes.create({
        Make: req.body.make,
        Model: req.body.model,
        Color: req.body.color,
        SerialNumber: req.body.serial,
        ImageURL: req.body.picture
    })
        .then(bikes => res.redirect("/"))
})


//mark bike stolen
router.put('/api/bikes/stolen', (req, res) => {
    db.bikes.update({
        DateStolen: req.body.date,
        LocationStolen: req.body.location,
        TimeStolen: req.body.time,
        Reward: req.body.reward
    })
        .then(bikes => res.json(bikes))
})



//find bike belonging to user
router.get('/mybikes', (req, res) => {
    console.log(req.user);
    db.Bikes.findAll ({
        where: {
            id: req.user    
        }
    }).then((data) => {
        let hbsinfo = {
            bikes: data
        };
        
        console.log(hbsinfo);
        res.render("mybikes",hbsinfo)

})
})

//delete bike
router.delete('/api/bikes/delete', (req, res) => {
    console.log(req.body.delete)
    db.Bikes.destroy({
        where: {
            id: req.body.delete
        }
    }).then(bikes => res.redirect("/"))
})




router.get('/swag', (req, res) => {
    res.render("swag");
   
});

router.get('/team', (req, res) => {
    res.render("team");
});


router.get('/addbike', (req, res) => {
    res.render("addbike");
});

router.get('/mybikes', (req, res) => {
    res.render("mybikes");
});

router.get('/login', (req, res) => {

    res.render("login");
   
});


module.exports = router;
