import ExtendableError from "es6-error"

export default class ResponseError extends ExtendableError {
  constructor(response) {
    const { status, statusText } = response
    super(`HTTP Error: [${status}] ${statusText}`)
    this.status = status
    this.statusText = statusText
    this.response = response
  }
}
