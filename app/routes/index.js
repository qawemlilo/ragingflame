
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Ragigng Flame Laboratory' })
};

exports.about = function(req, res){
  res.render('about', { title: 'Ragigng Flame Laboratory - About' })
};

exports.projects = function(req, res){
  res.render('about', { title: 'Ragigng Flame Laboratory - Projects' })
};