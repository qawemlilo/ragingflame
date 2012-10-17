
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Raging Flame Lab - Responsive web design and Joomla! development', page: 'index', msg: false})
};


exports.about = function(req, res){
  res.render('about', { title: 'Raging Flame Lab - About', page: 'about', msg: false })
};


exports.projects = function(req, res){
  res.render('projects', { title: 'Raging Flame Laboratory - Projects', page: 'projects', msg: false })
};


exports.contact = function(req, res){
  res.render('contact', { title: 'Raging Flame Laboratory - Contact Us', page: 'contact', msg: false })
};

exports.tweaks = function(req, res){
  res.render('tweaks', { title: 'Raging Flame Laboratory - Tweaks', page: 'tweaks', msg: false })
};

exports.packages = function(req, res){
  res.render('packages', { title: 'Raging Flame Laboratory - Packages', page: 'packages', msg: false })
};

exports.hire = function(req, res){
  res.render('hire', { title: 'Raging Flame Laboratory - Hire Me', page: 'hire', msg: false })
};
