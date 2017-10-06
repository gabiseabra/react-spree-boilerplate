import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  FormGroup,
  FormControl,
  InputGroup,
  Checkbox,
  Button
} from "react-bootstrap"

class QuickSearch extends Component {
  static propTypes = {
    category: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }

  state = {
    value: "",
    limit: true
  }

  onChangeValue = (e) => {
    const { onChange } = this.props
    const value = e.target.value
    this.setState({ value })
    if(onChange) onChange({ ...this.state, value })
  }

  onChangeLimit = (e) => {
    const { onChange } = this.props
    const limit = e.target.checked
    this.setState({ limit })
    if(onChange) onChange({ ...this.state, limit })
  }

  onSubmit = (e) => {
    const { onSubmit } = this.props
    if(onSubmit) onSubmit(this.state)
    e.preventDefault()
  }

  render() {
    const { category } = this.props
    const { value, limit } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              value={value}
              onChange={this.onChangeValue} />
            {category &&
            <InputGroup.Addon>
              <Checkbox inline checked={limit} onChange={this.onChangeLimit}>
                Limit search to {category}
              </Checkbox>
            </InputGroup.Addon>}
            <InputGroup.Button>
              <Button type="submit">Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

export default QuickSearch
