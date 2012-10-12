
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

// Load home page
app.get('/', routes.index);

// Load about page
app.get('/about', routes.about);

// Load projects page
app.get('/projects', routes.projects);

// Load contact page
app.get('/contact', routes.contact);

// Process contact form
app.post('/contact', function (req, res) { 
    var mailOpts, validation, smtpTrans, name = req.body.name, email = req.body.email, message = req.body.message, errMsg = '';
    
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
    
    // nodemailer configuration
    smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: ragingflame.email,
            pass: ragingflame.password
        }
    });
    
    // mailing options    
    mailOpts = {
        from: name + ' <' + email + '>',
        to: ragingflame.email,
        subject:'Contact from rflab website',
        text: 'From: ' + email + "\n \n" +  message
    };
    
    
    // Send maail    
    smtpTrans.sendMail(mailOpts, function (error, response) {
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

app.listen(3002, function git() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
