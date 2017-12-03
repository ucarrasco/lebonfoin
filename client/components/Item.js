import React from 'react'
import { Card } from 'reactstrap'
import { connect } from 'react-redux'
import moment from 'moment-timezone'

const thumbSizeData = {
  max: 60,
  min: 40,
  maxThreshold: 4,
  minThreshold: 10
}

const calculateThumbSize = numberOfItems => {
  let { max: fx2, min: fx1, maxThreshold: x2, minThreshold: x1 } = thumbSizeData
  let a = (fx2 - fx1) / (x2 - x1)
  let b = fx1 - x1 * a
  return Math.max(thumbSizeData.min, Math.min(thumbSizeData.max, Math.round(numberOfItems * a + b)))
}

const Item = ({ url, title, description, price, images, date, location }) => {
  let thumbSize = images.length > 1 ? calculateThumbSize(images.length - 1) : undefined

  return (
    <Card className="mt-4">
      <a href={url} target="_blank" className="d-flex flex-row link-unstyled" style={{ minHeight: 200 }}>
        <div className="image" style={{ flex: 3, backgroundImage: (images.length ? `url('${images[0].url}')` : undefined), backgroundSize: "cover", backgroundPosition: "center" }}>{
          //images.length && <img src={images[0].thumbUrl} alt="" style={{minHeight: 200 }} />
        }
        </div>
        <div style={{ flex: 7}} className="p-3 d-flex flex-column">
          <div className="d-flex flex-row">
            <h3 style={{ flex: 1}}>{title}</h3>
            <div style={{ fontSize: "0.9em", color: "#aeaeae" }}>{moment(date).fromNow() /*format("ddd D HH[h]mm")*/}</div>
          </div>
          <div style={{ flex: 1 }}>{description}</div>
          <div style={{ fontSize: "1em", fontStyle: "italic", color: "#aeaeae" }} className="d-flex flex-column justify-content-end mt-4">
            <div>{location.summary}</div>
          </div>

          <div className="d-flex flex-row">
            <div style={{ flex: 1, marginRight: 50 }} className="d-flex align-items-end">{
              price !== undefined &&
                <strong style={{ fontSize: "1.6rem" }}>{price}€</strong>
            }
            </div>
            {
              (images.length > 1) &&
              <div className="d-flex flex-row">{
                images.slice(1).map(({thumbUrl}, imageIndex) =>
                  <img src={thumbUrl} alt={`Image #${imageIndex + 1 + 1}`} key={imageIndex} style={{ width: thumbSize, height: thumbSize, borderRadius: 4, marginLeft: (imageIndex ? (thumbSize * 0.2) : undefined) }} className="image-thumb" />
                )
              }</div>
            }
          </div>
          
        </div>
      </a>
    </Card>
  )
}


const mapStateToProps = ({ items }, { index }) => items[index]
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Item)