var fs = require('fs');
var Mustache = require('mustache');

var options = {
  taskName: 'test-builder',

  cwd: 'test/spec',

  match: ['**/**.js'],

  template: [__dirname, 'test-builder.mustache'].join('/'),
  
  specRunner: [process.cwd(), 'test/spec/index.html'].join('/'),

  map: function(spec) {
    return ['' , this.cwd, spec].join('/');
  },

  onComplete: function(specs, done) {
    var template, view;

    template = fs.readFileSync(this.template).toString();

    view = {'specs' : '\'' + specs.sort().join('\',\'') + '\''};

    fs.writeFileSync(this.specRunner, Mustache.render(template, view));

    done();
  }
};

module.exports = options;