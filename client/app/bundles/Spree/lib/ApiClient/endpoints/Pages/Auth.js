import Endpoint from "../Endpoint"
import { User } from "../../models"

export default class AuthPage extends Endpoint {
  routes() {
    return [
      { path: "/login", action: this.login },
      { path: "/logout", action: this.logout }
    ]
  }

  async login({ login, password, rememberMe }) {
    const body = new FormData()
    body.append("spree_user[email]", login)
    body.append("spree_user[password]", password)
    body.append("spree_user[remember_me]", rememberMe ? "1" : "")
    try {
      // spree_auth_devise responds to .js format instead of .json
      const response = await this.fetch("/login.js", {
        credentials: "same-origin",
        method: "POST",
        body
      })
      return new User(response.data.user)
    } catch(error) {
      if(error.status !== 422) throw error
      try {
        return await error.response.json()
      } catch(_) { throw error }
    }
  }

  logout() {
    return this.fetch("/logout", {
      credentials: "same-origin",
      format: null
    })
  }
}
