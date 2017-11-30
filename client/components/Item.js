import React from 'react'
import { Card } from 'reactstrap'
import { connect } from 'react-redux'

const thumbSize = 60

const Item = ({ url, title, description, price, images, date }) =>
  <Card className="mt-4">
    <a href={url} target="_blank" className="d-flex flex-row link-unstyled" style={{ minHeight: 200 }}>
      <div className="image" style={{ flex: 3, backgroundImage: (images.length ? `url('${images[0].url}')` : undefined), backgroundSize: "cover"}}>{
        //images.length && <img src={images[0].thumbUrl} alt="" style={{minHeight: 200 }} />
      }
      </div>
      <div style={{ flex: 7}} className="p-3 d-flex flex-column">
        <h3>{title}</h3>
        <div style={{ flex: 1 }}>{description}</div>

        <div className="d-flex flex-row">
          <div style={{ flex: 1 }}>{
            price !== undefined &&
              <strong style={{ fontSize: "1.6rem" }}>{price}€</strong>
          }
          </div>
          {
            (images.length > 1) &&
            <div className="d-flex flex-row">{
              images.slice(1).map(({thumbUrl}, imageIndex) =>
                <img src={thumbUrl} alt={`Image #${imageIndex + 1 + 1}`} key={imageIndex} style={{ width: thumbSize, height: thumbSize, borderRadius: 4 }} className="image-thumb" />
              )
            }</div>
          }
        </div>
        
      </div>
    </a>
  </Card>


const mapStateToProps = ({ items }, { index }) => items[index]
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Item)