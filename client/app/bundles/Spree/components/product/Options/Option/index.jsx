import React, { Component } from "react"
import propTypes from "./propTypes"
import Color from "./Color"
import Text from "./Text"

export default class Option extends Component {
  static propTypes = propTypes

  onSelect = () => {
    const { id, onSelect } = this.props
    onSelect(id)
  }

  renderButton() {
    const props = this.props
    switch(props.optionType) {
      case "tshirt-color":
      case "bag-color":
        return <Color {...props} onSelect={this.onSelect} />
      default:
        return <Text {...props} onSelect={this.onSelect} />
    }
  }

  render() {
    return (
      <span>{this.renderButton()}</span>
    )
  }
}
