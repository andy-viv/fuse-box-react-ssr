import path from 'path'
import Express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import {match} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect'
import createHistory from 'react-router/lib/createMemoryHistory'
import {Provider} from 'react-redux'

import Html from './helpers/Html'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'
import getRoutes from './routes'
import config from './config'

const app = new Express()

app.use(Express.static(path.join(__dirname, '..', 'dist')))

app.use((req, res) => {
  const client = new ApiClient(req)
  const memoryHistory = createHistory(req.originalUrl)
  const store = createStore(memoryHistory, client)
  const history = syncHistoryWithStore(memoryHistory, store)

  function hydrateOnClient () {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html store={store} />))
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', error)
      res.status(500)
      hydrateOnClient()
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key='provider'>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )
        global.navigator = {userAgent: req.headers['user-agent']}
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html component={component} store={store} />))
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(config.port, function () {
  console.log('Example app listening on port 3446!')
})
