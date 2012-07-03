
/**
 * Module dependencies.
 */

var express = require('express')
  , nodemailer = require('nodemailer') 
  , routes = require('./routes');

var app = module.exports = express.createServer();

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

app.post('/contact', function (req, res) { 
    var mailOpts, validation, smtpTrans, name = req.body.name, email = req.body.email, message = req.body.message, errMsg = '';
    
    validation = routes.validate.fields({
        name: name, 
        email: email, 
        textarea: message
    });
    
    errMsg = validation.message;
    
    if (errMsg) {
        if (validation.errors > 1) {
            errMsg += ' contain invalid input.';
        }
        else {
            errMsg += ' contains invalid input.';
        }
        
        res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message not sent, ' + errMsg, err: true, page: 'contact' });
        return;
    }
    
    
    smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: "qawemlilo@gmail.com",
            pass: "qerlkxveorabgzrg"
        }
    });
    
        
    mailOpts = {
        from: name + ' <' + email + '>',
        to: 'qawemlilo@gmail.com',
        subject: 'Contact from rflab website',
        text: message
    };
    
        
    smtpTrans.sendMail(mailOpts, function (error, response) {
        if (error) {
            res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' });
        }
        else {
            res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' });
        }
    });
});

app.listen(3002, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
