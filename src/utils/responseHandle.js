const successHandle = (message, data) => {
  console.log(message, data)
}

const errorHandle = (message, data) => {
  console.error(message, data)
}

export const resStatus = (
  { status, message, data, errors },
  successTodo = successHandle,
  errorTodo = errorHandle
) => {
  if (!status) return errorTodo(message, errors)
  successTodo(message, data)
}
