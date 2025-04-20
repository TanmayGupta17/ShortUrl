export default (number, rule) => {
  const chars = rule.split('')
  const radix = chars.length
  let qutient = +number
  const arr = []
  do {
    const mod = qutient % radix
    qutient = (qutient - mod) / radix
    arr.unshift(chars[mod])
  } while (qutient)
  return arr.join('')
}
