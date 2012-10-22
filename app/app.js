
"use strict";

/**
 * Module dependencies.
 */
 
var express = require('express'), 
    nodemailer = require('nodemailer'), // module for sending emails
    routes = require('./routes'),
    ragingflame = require('./ragingflame'), // include app custom script file

    app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/about', routes.about);

app.get('/projects', routes.projects);

app.get('/contact', routes.contact);

app.get('/bugs', routes.bugs);

app.get('/packages', routes.packages);

app.get('/hireme', routes.hire);

app.post('/contact', function (req, res) {
    var validation, name = req.body.name, email = req.body.email, message = req.body.message, errMsg = '';
    
    //validate form input
    validation = ragingflame.validate.fields({
        name: name, 
        email: email, 
        textarea: message
    });
    
    errMsg = validation.message;
    
    // if the form contain any errors
    if (errMsg) {
        if (validation.errors > 1) {
            errMsg += ' contain invalid input.';
        }
        else {
            errMsg += ' contains invalid input.';
        }
        
        //reload the page with an error message
        res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message not sent, ' + errMsg, err: true, page: 'contact' });
        return;
    }
    
    
    // Send maail    
    routes.mailer(ragingflame, nodemailer, name + ' <' + email + '>', 'Contact from rflab website', message, function(error) {
        //if sending fails
        if (error) {
            //reload the page with an error message
            res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' });
        }
        //Yay!! message sent
        else {
            //reload the page with an success message
            res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' });
        }
    });
});


app.post('/bugs', function (req, res) {
    var validation, website = req.body.website, email = req.body.email, message = req.body.message;
    
    
    // Send maail    
    routes.mailer(ragingflame, nodemailer, email, 'Bug report from website', message, function(error) {
        //if sending fails
        if (error) {
            //reload the page with an error message
            res.render('bugs', { title: 'Raging Flame Laboratory - Contact', msg: 'failed', err: true, page: 'bugs' });
        }
        //Yay!! message sent
        else {
            //reload the page with an success message
            res.render('bugs', { title: 'Raging Flame Laboratory - Contact', msg: 'sent', err: false, page: 'bugs' });
        }
    });
});


app.post('/bugs', function (req, res) {
    var website = req.body.website, email = req.body.email, message = req.body.message;
    
    
    // Send maail    
    routes.mailer(ragingflame, nodemailer, email, 'Bug report from website', message, function(error) {
        //if sending fails
        if (error) {
            //reload the page with an error message
            res.render('bugs', { title: 'Raging Flame Laboratory - Contact', msg: 'failed', err: true, page: 'bugs' });
        }
        //Yay!! message sent
        else {
            //reload the page with an success message
            res.render('bugs', { title: 'Raging Flame Laboratory - Contact', msg: 'sent', err: false, page: 'bugs' });
        }
    });
});


app.post('/hireme', function (req, res) {
    var body = '', project = req.body.project, size = req.body.size, cms = req.body.cms, email = req.body.email,
        language = req.body.language, animation = req.body.animation, dropdowns = req.body.dropdowns,
        slider = req.body.slider, time = req.body.time, message = req.body.message, website = req.body.website;
    
    body += "Type of project: \t " + project + " \n \n";
    body += "Size of website: \t " + size + " \n \n";
    body += "Preferred CMS: \t " + cms + " \n \n";
    body += "Programing Language: \t " + (language || 'not specified') + " \n \n";
    body += "Website requires: \t " + (animation || 'no animation') + ", " + (dropdowns || 'no dropdowns') + ", " + (slider || 'no slider') + " \n \n";
    body += "Projected Time: \t " + time + " \n \n";
    body += "Project Description: \t " + message + " \n \n";
    body += "Website: \t " + website + " \n \n \n \n";
    
    body += "Raging Flame Website";
    
    // Send maail    
    routes.mailer(ragingflame, nodemailer, email, 'Bug report from website', body, function(error) {
        //if sending fails
        if (error) {
            //reload the page with an error message
            res.render('hire', { title: 'Raging Flame Laboratory - Hire Me', msg: 'failed', err: true, page: 'hire' });
        }
        //Yay!! message sent
        else {
            //reload the page with an success message
            res.render('hire', { title: 'Raging Flame Laboratory - Hire Me', msg: 'sent', err: false, page: 'hire' });
        }
    });
});


app.listen(3002, function git() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
