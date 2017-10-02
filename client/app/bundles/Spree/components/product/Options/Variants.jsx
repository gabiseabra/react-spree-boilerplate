import _ from "lodash"
import React, { Component } from "react"
import PropTypes from "prop-types"
import OptionType from "./OptionType"

function isSelectionCompleted(selected, { optionTypes }) {
  return _.difference(_.keys(optionTypes), _.keys(selected)).length === 0
}

function selectVariant(selected, { optionTypes, variants }) {
  const products = Object.keys(selected).map(typeId => (
    optionTypes[typeId].options[selected[typeId]].variantIds
  ))
  const result = _.intersection(...products)
  return (result.length === 1 ? variants[result[0]] : undefined)
}

export default class Variants extends Component {
  static propTypes = {
    optionTypes: PropTypes.object.isRequired,
    variants: PropTypes.objectOf(PropTypes.object).isRequired,
    onChange: PropTypes.func
  }

  state = {
    selected: {},
    completed: false,
    variant: undefined
  }

  onChange = (typeId, optionId) => {
    const { onChange } = this.props
    const selected = {
      ...this.state.selected,
      [typeId]: optionId
    }
    const completed = isSelectionCompleted(selected, this.props)
    const variant = completed ? selectVariant(selected, this.props) : undefined
    this.setState({
      selected,
      completed,
      variant
    })
    if(onChange) onChange(variant, completed)
  }

  renderType(id) {
    const type = this.props.optionTypes[id]
    return (
      <OptionType {...type} key={type.id} onChange={this.onChange} />
    )
  }

  render() {
    const { optionTypes } = this.props
    return (
      <div>
        {Object.keys(optionTypes).map(id => this.renderType(id))}
      </div>
    )
  }
}
