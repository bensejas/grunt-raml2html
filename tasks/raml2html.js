(function() {
  var async, raml2html;

  raml2html = require('raml2html');

  async = require('async');

  module.exports = function(grunt) {
    return grunt.registerMultiTask('raml2html', 'Compile raml files to html', function() {
      var done, fileCount, mainTemplate, ref, templatesPath;
      done = this.async();
      ref = this.options(), mainTemplate = ref.mainTemplate, templatesPath = ref.templatesPath;
      if (mainTemplate == null) {
        mainTemplate = false;
      }
      if (templatesPath == null) {
        templatesPath = false;
      }
      async.eachSeries(this.files, function(arg, next) {
        var config, dest, source, src;
        src = arg.src, dest = arg.dest;
        grunt.log.debug("Compiling " + src + " to " + dest);
        source = src[0];
        config = raml2html.getDefaultConfig(mainTemplate, templatesPath);
        raml2html.render(source, config).then(function(html) {
          grunt.file.write(dest, html);
          grunt.log.writeln("file " + dest.cyan + " created");
          return next();
        }).catch(function(error) {
          grunt.log.error(error);
          return done(false);
        });
        return grunt.log.debug("Compiled " + src);
      }, done);
      fileCount = this.files.length;
      return grunt.log.ok(fileCount + " " + (grunt.util.pluralize(fileCount, 'file/files')) + " compiled to html.");
    });
  };

}).call(this);
