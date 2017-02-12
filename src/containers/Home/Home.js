import React, {Component} from 'react'
import {connect} from 'react-redux'
import {up, down} from '../../redux/modules/counter'
// import style from './style.scss'

const style = {}

class Home extends Component {

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

export default connect(
  (state) => ({
    count: state.counter.count
  }),
  {
    up, down
  }
)(Home)
