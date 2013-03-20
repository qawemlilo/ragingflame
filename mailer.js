var nodemailer = require('nodemailer'),
    mailer;
 
mailer = function (opts, fn) {
 
    var mailOpts, smtpTrans;
 
    // nodemailer configuration
    try {
        smtpTrans = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
                user: 'qawemlilo@gmail.com',
                pass: 'qerlkxveorabgzrg'
            }
        });
    }
    catch (err) {
        fn('Nodemailer could not create Transport', '');
        return;
    }
 
    // mailing options
    mailOpts = {
        from: opts.from,
        replyTo: opts.from,
        to: 'qawemlilo@gmail.com',
        subject: 'Contact from <rflab.co.za>',
        html: opts.body
    };
 
    // Send maail
    try {
        smtpTrans.sendMail(mailOpts, function (error, response) {
            //if sending fails
            if (error) {
                fn(true, error);
            }
            //Yay!! message sent
            else {
                fn(false, response.message);
            }
        });
    }
    catch (err) {
        fn('Nodemailer could not send Mail', '');
    }
};
 
module.exports = mailer;