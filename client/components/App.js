import React from 'react'
import { Container, Card, Jumbotron } from 'reactstrap'
import Item from './Item'

const App = () =>
  <div>

    <Jumbotron>
      <h1>Le bon couaing</h1>
    </Jumbotron>

    <Container>
      <Item></Item>
      <Item></Item>
      <Item></Item>
    </Container>
  </div>

export default App

