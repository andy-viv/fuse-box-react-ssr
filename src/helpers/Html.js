import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'

export default class Html extends Component {
  static propTypes = {
    component: PropTypes.node,
    store: PropTypes.object
  }

  render () {
    const {assets, component, store} = this.props
    const content = component ? ReactDOM.renderToString(component) : ''
    return (
      <html>
        <head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        </head>
        <body>
          <div id='content' dangerouslySetInnerHTML={{__html: content}} />
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())}`}} charSet='UTF-8' />
          <script src='bundle.js' charSet='UTF-8' />
        </body>
      </html>
    )
  }
}
