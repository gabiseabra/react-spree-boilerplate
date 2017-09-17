import address from "./address"

export default (id = 1, { email, login } = {}) => ({
  id,
  email: email || "user@example.com",
  login: login || "user",
  bill_address: address(),
  ship_address: address()
})
