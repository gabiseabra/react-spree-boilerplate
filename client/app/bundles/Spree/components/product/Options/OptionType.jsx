import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row } from "react-bootstrap"
import Option from "./Option"

export default class OptionType extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    presentation: PropTypes.string.isRequired,
    options: PropTypes.objectOf(PropTypes.object).isRequired,
    onChange: PropTypes.func
  }

  state = {
    selected: null
  }

  onChange = (optionId) => {
    const { id, onChange } = this.props
    this.setState({ selected: optionId })
    onChange(id, optionId)
  }

  renderOption(id) {
    const { selected } = this.state
    const option = this.props.options[id]
    return (
      <Option
        key={option.id}
        optionType={this.props.name}
        selected={selected === option.id}
        onSelect={this.onChange}
        {...option} />
    )
  }

  render() {
    const { presentation, options } = this.props
    return (
      <div>
        <div>{presentation}</div>
        <Row>
          {Object.keys(options).map(id => this.renderOption(id))}
        </Row>
      </div>
    )
  }
}
