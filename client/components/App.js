import React, { Component } from 'react'
import {
  Container,
  Card,
  Jumbotron,
} from 'reactstrap'
import Toolbar from './Toolbar'
import Item from './Item'
import { connect } from 'react-redux'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Loader from './Loader'
import request from 'request-promise-native'
import { fetchItems, setNavigation } from '../actionCreators';

const pollingFrequencySec = 3

class App extends Component {
  
  componentDidMount() {
    request(`${backendHost}/app/navigation`).then(navStr => { this.props.setNavigation(JSON.parse(navStr))})
    this.props.fetchItems()
  }

  render() {
    let {
      items,
      fetching,
    } = this.props
    return (
      <div>
        <Jumbotron className="jumbooo">
          <h1 className="display-3">Le bon foin</h1>
        </Jumbotron>

        <Container>
          <div className="row">
            <div className="col-xl-10">
              <Toolbar />
              {
                fetching ? <Loader marginTop="20vh" /> :
                  <div className="d-flex flex-column-reverse justify-content-around flex-wrap">
                  {/* <ReactCSSTransitionGroup
                    transitionName="item"
                    transitionEnterTimeout={3000}
                    transitionLeaveTimeout={300}
                    component="div"
                    className="d-flex flex-column-reverse justify-content-around flex-wrap"> */}
                    {
                    items.map(
                      (item, i) =>
                        <Item key={i} index={i} />
                    )
                  }
                  {/* </ReactCSSTransitionGroup> */}
                  </div>
              }
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
  

const mapStateToProps = ({
  items,
  itemsFetch: { fetching }
}) => ({ items, fetching })

const mapDispatchToProps = dispatch => ({
  fetchItems: query => { dispatch(fetchItems(query)) },
  setNavigation: navigation => { dispatch(setNavigation(navigation)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)