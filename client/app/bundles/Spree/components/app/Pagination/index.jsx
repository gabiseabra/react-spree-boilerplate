import React from "react"
import { Menu } from "semantic-ui-react"
import { createUltimatePagination, ITEM_TYPES } from "react-ultimate-pagination"

/* eslint-disable react/prop-types */
const WrapperComponent = ({ children }) => (
  <Menu pagination>{children}</Menu>
)

const Page = ({ value, isActive, ...props }) => (
  <Menu.Item name={String(value)} active={isActive} {...props} />
)

const renderArrow = label => ({ isActive, ...props }) => (
  <Menu.Item disabled={isActive} {...props}>{label}</Menu.Item>
)

const First = renderArrow("\u00ab") // &laquo;

const Prev = renderArrow("\u2039") // &lsaquo;

const Next = renderArrow("\u203a") // &rsaquo;

const Last = renderArrow("\u00bb") // &raquo;

const Ellipsis = renderArrow("\u2026") // &hellip;

/* eslint-enable */

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.LAST_PAGE_LINK]: Last,
  [ITEM_TYPES.NEXT_PAGE_LINK]: Next,
  [ITEM_TYPES.FIRST_PAGE_LINK]: First,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: Prev
}

const Pagination = createUltimatePagination({ itemTypeToComponent, WrapperComponent })

export default Pagination
