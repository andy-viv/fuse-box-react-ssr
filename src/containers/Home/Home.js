import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'

import {up, down} from '../../redux/modules/counter'
import config from '../../config'

@connect(
  (state) => ({
    count: state.counter.count
  }),
  {
    up, down
  }
)
export default class Home extends Component {

  render () {
    const {up, down, count} = this.props
    return (
      <div>
        <Helmet title='Home' />
        <h1>Home</h1>
        <p>Count: {count}</p>
        <p>
          <button onClick={down}>Down</button>
          <button onClick={up}>Up</button>
        </p>
      </div>
    )
  }
}
