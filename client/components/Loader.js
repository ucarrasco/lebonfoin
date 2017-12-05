import React from 'react'
require('../_loader.scss')

export default ({ style, className }) =>
  <div className={`loader${ className ? ` ${className}` : ''}`} style={style}>
    <div className="cube1"></div>
    <div className="cube2"></div>
  </div>