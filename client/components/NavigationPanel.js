import React from 'react'
import { toggleNavigationVisibility, submitNewQuery } from '../actionCreators'
import { connect } from 'react-redux'
import _ from 'lodash'

const NavigationPanel = ({ navigation, toggleNavigationVisibility, submitNewQuery }) => 
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
                toggleNavigationVisibility()
                submitNewQuery(query)
                return false 
              }
            }>{label}</a>
        </li>
      )}
    </ul>
  </nav>

const mapStateToProps = ({ navigation }) => ({ navigation })
const mapDispatchToProps = dispatch => _({toggleNavigationVisibility, submitNewQuery }).mapValues(actionCreator => (...actionCreatorParams) => { dispatch(actionCreator(...actionCreatorParams)) }).value()

export default connect(mapStateToProps, mapDispatchToProps)(NavigationPanel)