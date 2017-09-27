import React from "react"
import PropTypes from "prop-types"
import { Carousel } from "react-bootstrap"

const Slideshow = ({ variant }) => (
  <Carousel>
    {variant.images.map(image => (
      <Carousel.Item key={image.id}>
        <img src={image.urls.large} alt="" />
        <Carousel.Caption>
          <p>{image.alt}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
)

Slideshow.propTypes = {
  variant: PropTypes.object.isRequired
}

export default Slideshow
