import React, {Component} from 'react'
import {connect} from 'react-redux'
import {up, down} from '../../redux/modules/counter'
// import style from './style.scss'
import config from '../../config'

const style = {}

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
      <div className={style.container}>
        <h1>home</h1>
        <p>Count: {count}</p>
        <p>
          <button onClick={down}>Down</button>
          <button onClick={up}>Up</button>
        </p>
      </div>
    )
  }
}
