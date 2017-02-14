import React, {Component} from 'react'
import Helmet from 'react-helmet'
// import style from './style'

const style = {}

export default class About extends Component {
  render () {
    return (
      <div className={style.container}>
        <Helmet title='About' />
        <h1>About</h1>
      </div>
    )
  }
}
