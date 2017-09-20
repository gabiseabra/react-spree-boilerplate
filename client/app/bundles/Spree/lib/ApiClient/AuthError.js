import ExtendableError from "es6-error"

export default class AuthError extends ExtendableError {
  constructor(response, message) {
    const { status, statusText } = response
    super(message)
    this.status = status
    this.statusText = statusText
    this.response = response
  }
}
