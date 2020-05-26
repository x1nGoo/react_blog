import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login/index'
import BasicLayout from '../layouts/BasicLayout'

const Main = () => {
  return (
    <div>
      <Router>
        <Route path="/login" exact component={Login} />
        <Route path="/index" exact component={BasicLayout} />
      </Router>
    </div>
  )
}

export default Main