const fsbx = require('fuse-box')
const fs = require('fs')
const babelrc = fs.readFileSync('./.babelrc')

const fuseBox = fsbx.FuseBox.init({
  homeDir: 'src/',
  sourceMap: {
    bundleReference: 'sourcemaps.js.map',
    outFile: './dist/sourcemaps.js.map'
  },
  outFile: './dist/bundle.js',
  plugins: [
    fsbx.BabelPlugin({
      config: Object.assign({}, {sourceMaps: true}, JSON.parse(babelrc))
    }),
    fsbx.EnvPlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: !(process.env.NODE_ENV && process.env.NODE_ENV === 'production'),
      NODE_ENV: process.env.NODE_ENV
    }),
    fsbx.JSONPlugin(),
    fsbx.HTMLPlugin({useDefault: false})
  ]
})
if (process.env.NODE_ENV === 'production') {
  fuseBox.bundle('>client.js')
} else {
  fuseBox.devServer('>client.js', {
    httpServer: false,
    root: 'dist'
  })
}
