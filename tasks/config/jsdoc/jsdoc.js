var config = {
  taskName: 'jsdoc',
  dist: {
    src: ['src/'],
    options: {
      recurse: true,
      destination: 'doc',
      template: 'node_modules/ink-docstrap/template',
      configure: './bin/jsdoc-config.json'
    }
  }
};

module.exports = config;