var config = {
  taskName: 'mocha_phantomjs.test',
  options: {
    reporter: 'dot',
    urls: ['http://0.0.0.0:9000/test/spec/index.html']
  }
};

module.exports = config;