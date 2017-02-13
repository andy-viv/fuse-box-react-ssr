import React from 'react'
import ReactDOM from 'react-dom'
// import {AppContainer} from 'react-hot-loader'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import Root from './Root'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'

const client = new ApiClient()
const dest = document.getElementById('content')
const store = createStore(browserHistory, client, window.__data)
const history = syncHistoryWithStore(browserHistory, store)

render(Root)

function render (RootElement) {
  ReactDOM.render(
    <RootElement store={store} client={client} history={history} />,
    dest
  )
}
