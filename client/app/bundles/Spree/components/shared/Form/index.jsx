import React from "react"

const RailsForm = ({ csfrToken, children, method, action }) => (
  <form method="post" action={action}>
    {method !== "post" && <input type="hidden" name="_method" value={method} />}
    <input type="hidden" name="utf8" value="✓" />
    <input type="hidden" name="authenticity_token" value={csfrToken} />
    {children}
  </form>
)

export default RailsForm
