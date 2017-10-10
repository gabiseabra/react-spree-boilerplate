import React from "react"
import PropTypes from "prop-types"
import { FormattedMessage } from "react-intl"
import { page as messages } from "app/locales/messages"
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
            <FormattedMessage {...messages.limitSearch} values={{ category }} />
          </Checkbox>
        </InputGroup.Addon>}
        <InputGroup.Button>
          <Button type="submit">
            <FormattedMessage {...messages.search} />
          </Button>
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
