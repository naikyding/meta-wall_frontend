export const apiCath = (fun) => async (data) => {
  try {
    await fun(data)
  } catch (error) {
    console.log(error)
  }
}
