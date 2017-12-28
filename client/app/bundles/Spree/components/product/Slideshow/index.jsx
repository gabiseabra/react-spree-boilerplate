import React, { Component } from "react"
import PropTypes from "prop-types"
import { Thumbnail } from "react-bootstrap"
import styles from "./Slideshow.scss"

export default class Slideshow extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    variant: PropTypes.object
  }

  state = {
    selected: 0
  }

  componentWillReceiveProps(next) {
    if(next.variant !== this.variant) {
      this.setState({ selected: 0 })
    }
  }

  onChange = (e) => {
    const { image } = e.target.dataset
    this.setState({
      selected: isNaN(image) ? 0 : parseInt(image, 10)
    })
  }

  get variant() {
    const { product, variant } = this.props
    return variant || product.master
  }

  get images() {
    return this.variant.images
  }

  renderNoImage() {
    return (
      <img className={styles.noImage} src={require("images/no_image.png")} />
    )
  }

  render() {
    const images = this.images
    if(!images.length) return this.renderNoImage()
    const { product } = this.props
    const { selected } = this.state
    return (
      <div className={styles.Slideshow}>
        <div className={styles.image}>
          <img
            itemProp="image"
            src={images[selected].urls.large}
            alt={product.name} />
        </div>
        <ul className={styles.list}>
          {images.map((image, i) => (
            <li key={image.id}>
              <Thumbnail
                href="#"
                data-image={i}
                src={image.urls.mini}
                onMouseEnter={this.onChange} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
