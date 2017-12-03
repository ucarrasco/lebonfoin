import React, { Component } from 'react'
import {
  Container,
  Card,
  Jumbotron,
  ButtonToolbar,
  ButtonGroup,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Form,
  FormGroup,
  Label
} from 'reactstrap'
import {
  addItems,
  updateQueryInput,
  togglePolling,
  setNavigation,
  toggleNavigationVisibility,
  fetchItems,
  loadNewItems,
  submitNewQuery
} from '../actionCreators'
import Item from './Item'
import { connect } from 'react-redux'
import request from 'request-promise-native'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Loader from './Loader'

const pollingFrequencySec = 3

class App extends Component {
  
  componentDidMount() {
    request(`${backendHost}/app/navigation`).then(navStr => { this.props.setNavigation(JSON.parse(navStr))})
    this.props.fetchItems()
  }

  render() {
    let {
      items,
      activeQuery,
      queryInput,
      updateQueryInput,
      polling,
      togglePolling,
      navigation,
      showNavigation,
      toggleNavigationVisibility,
      fetchItems,
      loadNewItems,
      submitNewQuery,
      itemsFetch: { fetching }
    } = this.props
    return (
      <div>
        <Jumbotron className="jumbooo">
          <h1 className="display-3">Le bon foin</h1>
        </Jumbotron>

        <Container>
          <div className="row">
            <div className="col-xl-10">
              <ButtonToolbar>
                <InputGroup style={{ flex: 1 }} className="mr-2">
                  <InputGroupAddon>http://www.leboncoin.fr</InputGroupAddon>
                  <Input placeholder="/ameublement/offres/languedoc_roussillon/herault/" value={queryInput} onChange={event => { updateQueryInput(event.target.value) }} />
                </InputGroup>
                <ButtonGroup>{
                  (activeQuery != queryInput) ? [
                    <Button key="cancel" onClick={_ => { updateQueryInput(activeQuery) }}>Annuler</Button>,
                    <Button key="submit" onClick={_ => { submitNewQuery(queryInput) }}>Ok</Button>
                  ] : <Button key="refresh" onClick={_ => { loadNewItems() }}>Refresh</Button>
                }
                </ButtonGroup>
              </ButtonToolbar>

              <Form inline className="my-4">
                <Button className="mr-4 px-4" onClick={toggleNavigationVisibility}>Catégories</Button>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" checked={polling} onChange={_ => { togglePolling(); if (!polling) loadNewItems() }} className="mr-2" />{' '}
                    Auto refresh
                  </Label>
                </FormGroup>
              </Form>
              {
            navigation && showNavigation && (
              <nav className="categories py-3 px-4">
                <div className="caret-container">
                  <div className="caret"></div>
                  <div className="caret-border"></div>
                </div>
                <ul className="list-unstyled d-flex flex-column flex-wrap" style={{ maxHeight: 405 }}>{
                _(navigation).map(({label, query, navigation}) => [
                  {label, query, isCategory: true},
                  ...navigation
                ]).flatten().value().map(
                  ({ label, query, navigation, isCategory }, i) =>
                    <li key={i} className={ isCategory ? "category" : undefined}>
                      <a
                        href={query}
                        onClick={
                          event => { 
                            event.preventDefault()
                            submitNewQuery(query)
                            toggleNavigationVisibility()
                            return false 
                          }
                        }>{label}</a>
                    </li>
                  )}
                </ul>
              </nav>
            )}
            {
              fetching ? <div style={{ marginTop: "20vh" }}><Loader /></div> :
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
  activeQuery,
  queryInput,
  items,
  navigation,
  showNavigation,
  itemsFetch
}) => ({
  activeQuery,
  queryInput,
  items,
  navigation,
  showNavigation,
  itemsFetch
})

const mapDispatchToProps = dispatch => _({
  addItems,
  updateQueryInput,
  togglePolling,
  setNavigation,
  toggleNavigationVisibility,
  fetchItems,
  loadNewItems,
  submitNewQuery
}).mapValues(actionCreator => (...actionCreatorParams) => { dispatch(actionCreator(...actionCreatorParams)) }).value()

export default connect(mapStateToProps, mapDispatchToProps)(App)