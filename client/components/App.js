import React, { Component } from 'react'
import { Container, Card, Jumbotron } from 'reactstrap'
import Item from './Item'
import { connect } from 'react-redux'
import request from 'request-promise-native'

class App extends Component {

  refresh() {
    request('http://localhost:3000/ameublement/offres/languedoc_roussillon/herault/')
      .then(res => {
        this.props.addItems(JSON.parse(res))
        setTimeout(
          _ => {
            this.refresh()
          }, 3000
        )
      })
  }
  
  componentDidMount() {
    this.refresh()
  }

  render() {
    let { items } = this.props
    return (
      <div>
        <Jumbotron className="jumbooo">
          <h1 className="display-3">Le bon couaing</h1>
        </Jumbotron>

        <Container className="d-flex justify-content-around flex-wrap">{
          items.map(
            (item, i) =>
              <Item key={i} index={i} />
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