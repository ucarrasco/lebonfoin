import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import Toolbar from './Toolbar'
import Loader from './Loader'

{/* <ReactCSSTransitionGroup
            transitionName="item"
            transitionEnterTimeout={3000}
            transitionLeaveTimeout={300}
            component="div"
            className="d-flex flex-column-reverse justify-content-around flex-wrap"> */}
{/* </ReactCSSTransitionGroup> */}


const ItemListContainer = ({children, items, fetching }) => 
  <Row>
    <Col xl="10">
      <Toolbar />
      {(
        (fetching && items.length == 0) &&
          <Loader style={{ marginTop: "20vh" }} />
      )}
      <div style={{ height: 60 }}>
        { (fetching && items.length) ? <Loader /> : undefined }
      </div>
      <div className="d-flex flex-column-reverse justify-content-around flex-wrap">
        { children }
      </div>
    </Col>
  </Row>

const mapStateToProps = ({
  items,
  itemsFetch: { fetching }
}) => ({ items, fetching })

export default connect(mapStateToProps)(ItemListContainer)