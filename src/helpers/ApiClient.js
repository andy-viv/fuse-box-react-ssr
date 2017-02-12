// import superagent from 'superagent'

const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl (path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  if (process.env.__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://localhost:3010' + adjustedPath
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath
}

export default class ApiClient {
  constructor (req) {
    return console.log('construct')
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path))

        if (params) {
          request.query(params)
        }

        if (data) {
          request.send(data)
        }

        request.end((err, { body } = {}) => err ? reject(body.error || body || err) : resolve(body))
      })
    })
  }
  empty () {}
}
