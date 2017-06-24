import React from "react"
import ReactOnRails from "react-on-rails"
import { Provider } from "react-redux"

const withStore = storeName => Component => (props) => {
  const store = ReactOnRails.getStore(storeName)
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )
}

export default withStore
