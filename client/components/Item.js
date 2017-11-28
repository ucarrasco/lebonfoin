import React from 'react'
import { Card } from 'reactstrap'

const Item = ({children}) =>
  <Card className="item">
    {children}
  </Card>

export default Item