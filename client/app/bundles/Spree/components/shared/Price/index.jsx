import React from "react"
import PropTypes from "prop-types"
import { FormattedNumber } from "react-intl"
import { withContext } from "app/components"

const Price = ({ value, currency: _currency, railsContext, ...props }) => {
  const currency = _currency || railsContext.currency
  return (
    <FormattedNumber
      style="currency"
      value={value}
      currency={currency}
      {...props} />
  )
}

Price.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string,
  railsContext: PropTypes.object.isRequired
}

export default withContext(Price)
