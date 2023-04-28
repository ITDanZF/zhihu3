export class ApiException extends Error {
  private readonly code: number

  constructor (code: number, message: string) {
    super()
    this.code = code
    this.message = message
  }

  get errorCode () {
    return this.code
  }

  get errorMsg () {
    return this.message
  }
}
