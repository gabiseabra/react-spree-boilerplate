import FormData from "isomorphic-form-data"
import { User } from "../resources"

export default {
  "/login": async ({ username, password, rememberMe }) => {
    const body = new FormData()
    body.append("spree_user[email]", username)
    body.append("spree_user[password]", password)
    body.append("spree_user[remember_me]", rememberMe ? "1" : "")
    try {
      // spree_auth_devise responds to .js format instead of .json
      const data = await this.json("/login.js", {
        credentials: "same-origin",
        method: "POST",
        body
      })
      return new User(data.user)
    } catch(error) {
      if(error.status !== 422) throw error
      try {
        return error.response.json()
      } catch(_) { throw error }
    }
  },
  "/logout": async () => {
    await this.fetch("/logout", {
      credentials: "same-origin"
    })
    await this.refreshCsrfToken()
    return true
  }
}
