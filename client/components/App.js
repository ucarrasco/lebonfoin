import React, { Component } from 'react'
import { Container, Card, Jumbotron } from 'reactstrap'
import Item from './Item'
import { connect } from 'react-redux'
import request from 'request-promise-native'

class App extends Component {

  componentDidMount() {
    request('http://localhost:3000/ameublement/offres/languedoc_roussillon/herault/')
      .then(res => {
        this.props.addItems(JSON.parse(res))
      })
  }

  render() {
    let { items } = this.props
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Le bon couaing</h1>
        </Jumbotron>

        <Container>{
          items.map(
            (item, i) =>
              <Item key={i}>{item.title}</Item>
          )
        }
        </Container>
      </div>
    )
  }
}
  

const mapStateToProps = ({ items }) => ({ items })
const mapDispatchToProps = dispatch => ({
  addItems: items => { dispatch({ type: 'ADD_ITEMS', items })}
})

export default connect(mapStateToProps, mapDispatchToProps)(App)