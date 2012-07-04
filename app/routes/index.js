
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Raging Flame Laboratory', page: 'index'})
};


exports.about = function(req, res){
  res.render('about', { title: 'Raging Flame Laboratory - About', page: 'about' })
};


exports.projects = function(req, res){
  res.render('projects', { title: 'Raging Flame Laboratory - Projects', page: 'projects' })
};


exports.contact = function(req, res){
  res.render('contact', { title: 'Raging Flame Laboratory - Contact', page: 'contact' })
};
