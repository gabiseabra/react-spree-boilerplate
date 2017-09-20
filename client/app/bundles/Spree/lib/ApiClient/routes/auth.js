import FormData from "isomorphic-form-data"
import Response from "../Response"
import AuthError from "../AuthError"
import { User } from "../resources"

export default {
  "/login": async function ({ username, password, rememberMe }) {
    const body = new FormData()
    body.append("spree_user[email]", username)
    body.append("spree_user[password]", password)
    body.append("spree_user[remember_me]", rememberMe ? "1" : "")
    try {
      // spree_auth_devise responds to .js format instead of .json
      const response = await this.json("/login.js", {
        credentials: "same-origin",
        method: "POST",
        body
      })
      return new Response(response, new User(response.data.user))
    } catch(error) {
      if(error.status !== 422) throw error
      const data = await error.response.json()
      throw new AuthError(error.response, data.error)
    }
  },
  "/logout": async function () {
    await this.fetch("/logout", {
      credentials: "same-origin"
    })
    await this.refreshCsrfToken()
    return true
  }
}
