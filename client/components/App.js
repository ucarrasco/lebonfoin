import React, { Component } from 'react'
import { Container, Card, Jumbotron, ButtonToolbar, ButtonGroup, Button } from 'reactstrap'
import Item from './Item'
import { connect } from 'react-redux'
import request from 'request-promise-native'

const pollingFrequencySec = 3

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
          <h1 className="display-3">Le bon foin</h1>
        </Jumbotron>

        <Container>
          <ButtonToolbar>
            <ButtonGroup>
              <Button onClick={() => { this.refresh() }}>Refresh</Button>
            </ButtonGroup>
          </ButtonToolbar>
          <div className="d-flex justify-content-around flex-wrap">{
            items.map(
              (item, i) =>
                <Item key={i} index={i} />
            )
          }
          </div>
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