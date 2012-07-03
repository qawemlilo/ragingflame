
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

exports.validate = {
    email: function(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        
        return pattern.test(emailAddress);
    },
    

    fields: function(obj) {
        var errMsg = '', i = 0, validation = {};
        
        if (!obj.name || obj.name.length < 3 ) {
            errMsg += 'Name';
            i++;
        }
  
        if (!obj.email || !this.isValidEmailAddress(obj.email)) {
            i++;
            if (errMsg) errMsg += ', Email';
                else errMsg += 'Email';
        }
  
        if (!obj.textarea || obj.textarea.length < 5) {
            i++;
            if (errMsg) {
                errMsg += ' and Message';
            }
            else {
                errMsg += 'Message';
            }
        }
        
        validation.message = errMsg;
        validation.errors = i;
        
        return validation;
    }
};
