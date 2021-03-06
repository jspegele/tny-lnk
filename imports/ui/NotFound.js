import React from 'react'
import { Link } from 'react-router-dom'

import Header from './Header'

export default () => (
  <div className="boxed-view">
    <Header hideActions={true} />
    <div className="boxed-view--content">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>We were unable to find that page :-(</p>
        <Link className="button button--link" to="/">Head Home</Link>
      </div>
    </div>
  </div>
)
