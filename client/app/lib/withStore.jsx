import React from "react"
import ReactOnRails from "react-on-rails"
import Provider from "redux"

export default function withStore(storeName, Component) {
  const C = (props) => {
    const store = ReactOnRails.getStore(storeName)
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    )
  }
  return C
}
