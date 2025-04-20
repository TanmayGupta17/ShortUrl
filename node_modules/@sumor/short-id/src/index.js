import encodeFunc from './encode.js'
import decodeFunc from './decode.js'

const decode = (value, rule) => {
  rule = rule || '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'
  return decodeFunc(value, rule)
}
const encode = (value, rule) => {
  rule = rule || '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'
  return encodeFunc(value, rule)
}
export { decode, encode }
export default {
  decode,
  encode
}
