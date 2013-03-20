var http = require('http'),
    connect = require('connect'),
    mailer = require('./mailer'),
    port = process.env.PORT || 3002;
    
    
var app = connect()
    .use(connect.static('app')) 
    .use(connect.bodyParser());
   // .use('/contact', contact);


http.createServer(app).listen(port, function() {
  console.log('App running at http://localhost:%s', port);
});



function contact(req, res) {
    var url = req.body.video, 
        format = req.body.format || 'flv',
        quality = req.body.quality || '18';
}
