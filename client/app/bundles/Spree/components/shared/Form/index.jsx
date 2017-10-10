import React from "react"
import ReactOnRails from "react-on-rails"

const RailsForm = ({ children, method, action }) => (
  <form method="post" action={action}>
    {method !== "post" && <input type="hidden" name="_method" value={method} />}
    <input type="hidden" name="utf8" value="✓" />
    <input type="hidden" name="authenticity_token" value={ReactOnRails.authenticityToken()} />
    {children}
  </form>
)

export default RailsForm
