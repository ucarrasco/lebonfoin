import React, { Component } from 'react'
import {
  Container,
  Card,
  Jumbotron,
} from 'reactstrap'
import Item from './Item'
import { connect } from 'react-redux'
import _ from 'lodash'
import request from 'request-promise-native'
import { fetchItems, setNavigation } from '../actionCreators';
import ItemsListContainer from './ItemsListContainer';



class App extends Component {

  render() {
    let { items, fetching } = this.props
    return (
      <div>
        <Jumbotron className="jumbooo">
          <h1 className="display-3">Le bon foin</h1>
        </Jumbotron>

        <Container>
          <ItemsListContainer>{
            items.map(
              (item, i) =>
                <Item key={i} index={i} />
            )}
          </ItemsListContainer>
        </Container>
      </div>
    )
  }
  
  componentDidMount() {
    request(`${backendHost}/app/navigation`).then(navStr => { this.props.setNavigation(JSON.parse(navStr))})
    this.props.fetchItems()
  }
}
  

const mapStateToProps = ({ items }) => ({ items })

const mapDispatchToProps = dispatch => ({
  fetchItems: query => { dispatch(fetchItems(query)) },
  setNavigation: navigation => { dispatch(setNavigation(navigation)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)