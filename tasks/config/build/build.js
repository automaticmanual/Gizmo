var config = {
  taskName: 'requirejs.complile',
  options: {
    baseUrl: 'src/',
    name: 'gizmo',
    include: ['../lib/almond/almond'],
    out: 'bin/gizmo.min.js',
    wrap: {
      startFile: __dirname + '/start.frag',
      endFile: __dirname + '/end.frag'
    }
  }
};

module.exports = config;