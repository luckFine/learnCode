import setPrototypeOf = Reflect.setPrototypeOf

export class AxiosError extends Error {
  constructor(
    message,
    config,
    code,
    request,
    response
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message,
  config,
  code,
  request,
  response
) {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
