import R from 'ramda'

const auth = (packet, next, token) => {
  const received = R.pipe(
    R.find(R.prop('token')),
    R.values,
    R.head
  )(packet)

  if (received === token) {
    next()
  } else {
    next(new Error('Authentication error'))
  }
}

export default auth
