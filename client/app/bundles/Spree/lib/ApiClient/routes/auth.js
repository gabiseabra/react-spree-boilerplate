import FormData from "isomorphic-form-data"
import Response from "../Response"
import { User } from "../resources"

export default {
  "/login": async function ({ login, password, rememberMe }) {
    const body = new FormData()
    body.append("spree_user[email]", login)
    body.append("spree_user[password]", password)
    body.append("spree_user[remember_me]", rememberMe ? "1" : "")
    // spree_auth_devise responds to .js format instead of .json
    const response = await this.json("/login.js", {
      credentials: "same-origin",
      method: "POST",
      body
    })
    return new Response(response, new User(response.data.user))
  },
  "/logout": async function () {
    await this.fetch("/logout", {
      credentials: "same-origin"
    })
    await this.refreshCsrfToken()
    return true
  }
}
