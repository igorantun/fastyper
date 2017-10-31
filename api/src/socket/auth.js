import R from 'ramda'

const auth = (packet, next, token) => {
  const received = R.pipe(
    R.find(R.prop('token')),
    R.values,
    R.head
  )(packet)

  const verify = R.ifElse(
    R.equals,
    R.always(null),
    R.always(new Error('Authentication error'))
  )(token)

  console.log(received, token, verify(received))

  return next(verify(received))
}

export default auth
