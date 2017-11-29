import React from 'react'
import { Card } from 'reactstrap'
import { connect } from 'react-redux'

const Item = ({ url, title, description, price, images, date }) =>
  <Card className="mt-4">
    <a href={url} target="_blank" className="d-flex flex-row link-unstyled" style={{ minHeight: 200 }}>
      <div className="image" style={{ flex: 3, backgroundImage: (images.length ? `url('${images[0].url}')` : undefined), backgroundSize: "cover"}}>{
        //images.length && <img src={images[0].thumbUrl} alt="" style={{minHeight: 200 }} />
      }
      </div>
      <div style={{ flex: 7}} className="p-3">
        <h3>{title}</h3>
        <div>{description}</div>
        <div style={{ fontSize: "1.6rem", fontWeight: "bold"}} className="font-color-accent">{price}€</div>
      </div>
    </a>
  </Card>


const mapStateToProps = ({ items }, { index }) => items[index]
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Item)