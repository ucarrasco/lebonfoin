import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
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
  updateQueryInput,
  submitNewQuery,
  toggleNavigationVisibility,
  togglePolling,
  loadNewItems
} from '../actionCreators'
import NavigationPanel from './NavigationPanel'

const Toolbar = ({
  queryInput,
  activeQuery,
  polling,
  showNavigation,
  navigation,
  updateQueryInput,
  submitNewQuery,
  toggleNavigationVisibility,
  togglePolling,
  loadNewItems
}) =>
  <div>
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

    { navigation && showNavigation && <NavigationPanel /> }
  </div>



const mapStateToProps = ({
  queryInput,
  activeQuery,
  polling,
  showNavigation,
  navigation
}) => ({ 
  queryInput,
  activeQuery,
  polling,
  showNavigation,
  navigation
})

const mapDispatchToProps = dispatch => _({
  updateQueryInput,
  submitNewQuery,
  toggleNavigationVisibility,
  togglePolling,
  loadNewItems
}).mapValues(actionCreator => (...actionCreatorParams) => { dispatch(actionCreator(...actionCreatorParams)) }).value()

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)