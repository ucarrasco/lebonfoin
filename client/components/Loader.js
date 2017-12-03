import React from 'react'
require('../_loader.scss')

export default ({ marginTop }) =>
  <div className="loader" style={{ marginTop }}>
    <div className="cube1"></div>
    <div className="cube2"></div>
  </div>