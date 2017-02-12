const fsbx = require('fuse-box')

const fuseBox = fsbx.FuseBox.init({
  homeDir: 'src/',
  sourceMap: {
    bundleReference: 'sourcemaps.js.map',
    outFile: './dist/sourcemaps.js.map'
  },
  outFile: './dist/bundle.js',
  plugins: [
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
    fsbx.JSONPlugin()
  ]
})

fuseBox.devServer('>client.js')
