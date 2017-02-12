const fsbx = require('fuse-box')

const fuseBox = fsbx.FuseBox.init({
  homeDir: 'src/',
  sourceMap: {
    bundleReference: 'sourcemaps.js.map',
    outFile: './dist/sourcemaps.js.map'
  },
  outFile: './dist/bundle.js',
  cache: false,
  plugins: [
    fsbx.EnvPlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    }),
    fsbx.BabelPlugin({
      config: {
        sourceMaps: true,
        presets: ['latest', 'stage-0'],
        plugins: [
          ['transform-react-jsx']
        ]
      }
    }),
    [
      fsbx.SassPlugin({outputStyle: 'compressed'}),
      fsbx.CSSPlugin({})
    ],
    fsbx.JSONPlugin(),
    fsbx.HTMLPlugin({useDefault: false})
  ]
})

fuseBox.devServer('>client.js', {
  port: 3446,
  httpServer: false,
  root: 'dist'
})
