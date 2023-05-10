import crypto from 'crypto'
import SECRET_KEY from '../constant/secret-key.constants'
import bcrypt from 'bcrypt'

function _md5 (content: string) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

function randomHash (content: string) {
  return bcrypt.hashSync(content, 12)
}
export const doCryptoByMD5 = (password: string): string => {
  const str = `password=${password}&key=${SECRET_KEY.CRYPTO_SECRET_KEY}`
  return _md5(str)
}

export const doCryptoByRandomHash = (password: string): string => {
  return randomHash(password)
}
