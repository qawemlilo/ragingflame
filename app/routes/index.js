
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Ragigng Flame Laboratory', page: 'index' })
};

exports.about = function(req, res){
  res.render('about', { title: 'Ragigng Flame Laboratory - About', page: 'about' })
};

exports.projects = function(req, res){
  res.render('projects', { title: 'Ragigng Flame Laboratory - Projects', page: 'projects' })
};

exports.contact = function(req, res){
  res.render('contact', { title: 'Ragigng Flame Laboratory - Contact', page: 'contact' })
};
