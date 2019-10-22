module.exports = {
  publicPath: process.env.NODE_ENV == 'production' ? '/moment' : '/',
  outputDir: __dirname + '/../preview/moment/'
}
