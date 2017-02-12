import React from 'react'
import ReactDOM from 'react-dom'
import About from './containers/About/About'
import {Provider} from 'react-redux'
import {ReduxAsyncConnect} from 'redux-connect'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import getRoutes from './routes'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'

const client = new ApiClient()
const dest = document.getElementById('content')
const store = createStore(browserHistory, client, window.__data)
const history = syncHistoryWithStore(browserHistory, store)

const component = (
  <Router render={(props) =>
    <ReduxAsyncConnect {...props} helpers={{client}} filter={(item) => !item.deferred} />
      } history={history}>
    {getRoutes(store)}
  </Router>
)

ReactDOM.render(
  <Provider store={store} key='provider'>
    {component}
  </Provider>,
  dest
)
