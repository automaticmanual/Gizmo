var config = {
  
  taskName: 'mustache_render.jsdoc-config',
  files: [{
    data: './package.json',
    template: __dirname + '/jsdoc-config.mustache',
    dest: './bin/jsdoc-config.json'
  }]
};

module.exports = config;