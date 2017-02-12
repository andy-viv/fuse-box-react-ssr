import React, {Component} from 'react'
import {Link} from 'react-router'
// import style from './style.scss'

const style = {}

export default class App extends Component {
  render () {
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
          <p>Copyright</p>
        </footer>
      </div>
    )
  }
}
