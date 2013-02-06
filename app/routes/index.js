
/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index', { title: 'Raging Flame Lab - Responsive web design and Joomla! development', page: 'index', msg: false});
};


exports.about = function (req, res) {
  res.render('about', { title: 'Raging Flame Lab - About', page: 'about', msg: false });
};


exports.experiments = function (req, res) {
  res.render('experiments', { title: 'Raging Flame Laboratory - Experiments', page: 'experiments', msg: false });
};


exports.contact = function (req, res) {
  res.render('contact', { title: 'Raging Flame Laboratory - Contact Us', page: 'contact', msg: false });
};


exports.bugs = function (req, res) {
  res.render('bugs', { title: 'Raging Flame Laboratory - Report bugs', page: 'bugs', msg: false });
};


exports.packages = function (req, res) {
  res.render('packages', { title: 'Raging Flame Laboratory - Packages', page: 'packages', msg: false });
};


exports.hire = function (req, res) {
  res.render('hire', { title: 'Raging Flame Laboratory - Hire Me', page: 'hire', msg: false });
};


exports.mailer = function (config, nodemailer, from, subject, message, fn) {

    var mailOpts, smtpTrans;

    // nodemailer configuration
    smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: config.email,
            pass: config.password
        }
    });
    
    // mailing options    
    mailOpts = {
        from: from,
        to: config.email,
        subject: subject,
        text: 'From: ' + from + "\n \n" +  message
    };
    
    
    // Send maail    
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //if sending fails
        if (error) {
            fn(true);
        }
        //Yay!! message sent
        else {
            fn(false);
        }
    });
};
