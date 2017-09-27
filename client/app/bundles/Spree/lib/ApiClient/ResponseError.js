import ExtendableError from "es6-error"

export default class ResponseError extends ExtendableError {
  constructor(response, message, data) {
    const { status, statusText } = response
    super(message || `HTTP Error: [${status}] ${statusText}`)
    this.status = status
    this.statusText = statusText
    this.response = response
    this.data = data
  }
}
