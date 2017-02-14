import React, {Component} from 'react'
import {connect} from 'react-redux'
import {asyncConnect} from 'redux-connect'
import {Link} from 'react-router'
// import style from './style.scss'
import {isLoaded as isInfoLoaded, load as loadInfo} from '../../redux/modules/info'

const style = {}

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = []
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()))
    }
    return Promise.all(promises)
  }
}])
@connect(
  (state) => ({
    info: state.info.data
  }),
  {}
)
export default class App extends Component {
  render () {
    const {info: {message}} = this.props
    return (
      <div className={style.container}>
        <header className={style.header}>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
          </nav>
        </header>
        <main className={style.content}>
          {this.props.children}
        </main>
        <footer>
          <p>Info: {message}</p>
        </footer>
      </div>
    )
  }
}
