import React from "react"
import PropTypes from "prop-types"
import {
  FormGroup,
  FormControl,
  InputGroup,
  Checkbox,
  Button
} from "react-bootstrap"

const QuickSearch = ({
  value,
  limit,
  category,
  onChangeValue,
  onChangeLimit,
  onSubmit
}) => (
  <form onSubmit={onSubmit}>
    <FormGroup>
      <InputGroup>
        <FormControl
          type="text"
          value={value}
          onChange={onChangeValue} />
        {category &&
        <InputGroup.Addon>
          <Checkbox inline checked={limit} onChange={onChangeLimit}>
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

QuickSearch.propTypes = {
  value: PropTypes.string.isRequired,
  limit: PropTypes.bool.isRequired,
  category: PropTypes.string,
  onChangeValue: PropTypes.func,
  onChangeLimit: PropTypes.func,
  onSubmit: PropTypes.func
}

export default QuickSearch
