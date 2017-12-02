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
import Item from './Item'
import { connect } from 'react-redux'
import request from 'request-promise-native'
import _ from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const pollingFrequencySec = 3

class App extends Component {

  refresh(query = this.props.activeQuery) {
    request(`${backendHost}${query}`)
      .then(res => {
        this.props.addItems(JSON.parse(res))
        if (this.props.polling)
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
    let { items, activeQuery, queryInput, updateQueryInput, updateActiveQuery, polling, togglePolling } = this.props
    return (
      <div>
        <Jumbotron className="jumbooo">
          <h1 className="display-3">Le bon foin</h1>
        </Jumbotron>

        <Container>
          <div className="row">
            <div className="col-xl-10">
              <ButtonToolbar>
                <InputGroup style={{ flex: 1 }}>
                  <InputGroupAddon>http://www.leboncoin.fr</InputGroupAddon>
                  <Input placeholder="/ameublement/offres/languedoc_roussillon/herault/" value={queryInput} onChange={event => { updateQueryInput(event.target.value) }} />
                </InputGroup>
                <ButtonGroup>{
                  (activeQuery != queryInput) ? [
                    <Button key="cancel" onClick={_ => { updateQueryInput(activeQuery) }}>Annuler</Button>,
                    <Button key="submit" onClick={_ => { updateActiveQuery(queryInput); this.refresh(queryInput) }}>Ok</Button>
                  ] : <Button key="refresh" onClick={_ => { this.refresh() }}>Refresh</Button>
                }
                </ButtonGroup>
              </ButtonToolbar>

              <Form inline className="my-4">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" checked={polling} onChange={_ => { togglePolling(); if (!polling) this.refresh() }} className="mr-2" />{' '}
                    Auto refresh
                  </Label>
                </FormGroup>
              </Form>

              <ReactCSSTransitionGroup
                transitionName="item"
                transitionEnterTimeout={3000}
                transitionLeaveTimeout={300}
                component="div"
                className="d-flex flex-column-reverse justify-content-around flex-wrap">{
                items.map(
                  (item, i) =>
                    <Item key={i} index={i} />
                )
              }
              </ReactCSSTransitionGroup>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
  

const mapStateToProps = ({ activeQuery, queryInput, items }) => ({ activeQuery, queryInput, items })
const mapDispatchToProps = dispatch => ({
  addItems: items => { dispatch({ type: 'ADD_ITEMS', items })},
  updateQueryInput: text => { dispatch({ type: 'UPDATE_QUERY_INPUT', text})},
  updateActiveQuery: text => { dispatch({ type: 'UPDATE_ACTIVE_QUERY', text})},
  togglePolling: _ => { dispatch({ type: 'TOGGLE_POLLING' })}
})

export default connect(mapStateToProps, mapDispatchToProps)(App)